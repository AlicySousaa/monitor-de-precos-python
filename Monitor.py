from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

def buscar_dados_do_site(url_do_produto):
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
        response = requests.get(url_do_produto, headers=headers, timeout=10)
        response.raise_for_status() 
        soup = BeautifulSoup(response.text, 'html.parser')
        titulo_tag = soup.find("h1")
        titulo = titulo_tag.text.strip() if titulo_tag else "Produto sem título"
        preco_tag = soup.find("span", class_="andes-money-amount__fraction")
        preco = preco_tag.text.strip() if preco_tag else "N/A"
        
        return {"nome": titulo, "preco": preco}
    except Exception as e:
        return {"erro": str(e)}

@app.post("/api/rastrear")
async def api_rastrear(dados: dict):
    url_recebida = dados.get("url")
    if not url_recebida:
        raise HTTPException(status_code=400, detail="URL não fornecida")
        
    resultado = buscar_dados_do_site(url_recebida)
    return resultado
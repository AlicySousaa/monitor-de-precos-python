#  Monitor de Preços Real-Time

Este é um monitor de preços moderno que realiza web scraping em tempo real para extrair informações de produtos (título e preço). O projeto utiliza uma arquitetura separada entre um backend robusto em Python e um frontend reativo em React com Tailwind CSS.

---

## Tecnologias Utilizadas

### **Frontend**
* **React.js** (Vite)
* **Tailwind CSS** (Estilização moderna e responsiva)
* **Axios** (Comunicação com a API)
* **Lucide React** (Ícones)

### **Backend**
* **FastAPI** (Framework web de alta performance)
* **BeautifulSoup4** (Extração de dados HTML)
* **Requests** (Requisições HTTP)
* **Uvicorn** (Servidor ASGI)

---

##  Como Executar o Projeto

Para rodar o projeto localmente, você precisará de dois terminais abertos.

### 1. Configurando o Backend (Python)
Navegue até a pasta do projeto e execute:

```bash
# Instale as dependências (se ainda não instalou)
pip install fastapi uvicorn requests beautifulsoup4

# Inicie o servidor (substitua 'monitor' pelo nome do seu arquivo .py)
python -m uvicorn monitor:app --reload

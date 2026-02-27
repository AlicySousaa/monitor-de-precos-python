import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarProduto = async () => {
    if (!url) {
      alert("Por favor, cole um link antes!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/rastrear', {
        url: url
      });
      
      setProduto(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o Python! Verifique se o terminal do Python está aberto.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col items-center">
      {/* header */}
      <header className="w-full p-6 flex justify-between items-center border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Monitor de preço
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Status: <span className="text-green-400">Online</span></span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500"></div>
        </div>
      </header>

      {/* main */}
      <main className="max-w-4xl w-full px-6 py-16 text-center">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            Seu monitor de preços <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              em tempo real.
            </span>
          </h2>
        </div>

        {/* input area */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative flex gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">
            <input
              type="text"
              placeholder="Cole o link do Mercado Livre aqui..."
              className="flex-1 bg-transparent p-4 outline-none text-slate-200"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={buscarProduto}
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${
                loading ? 'bg-slate-700 text-slate-400' : 'bg-white text-black hover:bg-purple-500 hover:text-white'
              }`}
            >
              {loading ? "Processando..." : "Rastrear"}
            </button>
          </div>
        </div>

        {/* resultado do card */}
        {produto && (
          <div className="mt-12">
            <div className="p-8 bg-slate-800/40 border border-slate-700 rounded-3xl text-left backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-bold rounded uppercase border border-purple-500/30">
                    {produto.erro ? "Erro" : "Sucesso"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  {}
                  {produto.nome || "Não encontrado"}
                </h3>
                <div className="mt-4">
                  <span className="text-sm text-slate-400 block mb-1">Preço identificado:</span>
                  <p className="text-5xl font-black text-green-400">
                    {produto.preco ? `R$ ${produto.preco}` : "---"}
                  </p>
                </div>
              </div>
              
              {produto.nome && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black px-8 py-4 rounded-xl font-bold"
                >
                  Ver no Site
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
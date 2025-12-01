'use client';


import React, { useState, useEffect } from 'react';
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// --- COMPONENTES VISUAIS ---


const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#F5F5F7] dark:bg-[#000000] transition-colors duration-500">
    {/* Orbes de luz animados no fundo para dar profundidade */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, 90, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, 50, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/10 dark:bg-purple-900/20 rounded-full blur-[100px]"
    />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]"></div>
  </div>
);


const SecurityBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full border border-gray-200 dark:border-white/10 shadow-sm"
  >
    <Lock size={14} className="text-green-600 dark:text-green-400" />
    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
      Ambiente Seguro • SSL 256-bit
    </span>
  </motion.div>
);


// --- PÁGINA DE LOGIN ---


export default function LoginPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: Password
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  // Detecção de Tema
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);


  // Simulação de verificação de identidade
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;


    setIsLoading(true);
    // Simula tempo de verificação no banco de dados
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula autenticação final
    setTimeout(() => {
      setIsLoading(false);
      // Em um cenário real, redirecionaria aqui.
      // Para o evento, podemos mostrar um alert ou redirecionar para a home.
      if (typeof window !== 'undefined') {
         alert("Login Efetuado com Sucesso! (Simulação)");
         // window.location.href = "http://abriedu.org"; // Descomentar se quiser voltar para a LP
      }
    }, 2000);
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 font-sans text-gray-900 dark:text-white">
      <Background />
      <SecurityBadge />


      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* LOGO HERO */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-2"
          >
            <img
              src="https://i.ibb.co/9H8DPBS6/logotipo-abrid-lab.png"
              alt="Logo ABRID Lab"
              className="w-12 h-12 object-contain rounded-xl shadow-xl"
            />
            <span className="text-3xl font-bold tracking-tight">ABRID <span className="font-light opacity-60">Lab</span></span>
          </motion.div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Acesso Exclusivo para Credenciados</p>
        </div>


        {/* CARTÃO DE LOGIN (GLASSMORPHISM) */}
        <div className="bg-white/80 dark:bg-[#1C1C1E]/60 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
         
          {/* Barra de Progresso Superior */}
          <div className="h-1 w-full bg-gray-100 dark:bg-gray-800">
            <motion.div
              className="h-full bg-black dark:bg-white"
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "30%" : "100%" }}
              transition={{ duration: 0.5 }}
            />
          </div>


          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
             
              {/* ETAPA 1: EMAIL (IDENTIFICAÇÃO) */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">Identifique-se</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Insira seu e-mail corporativo ou ID ABRID para iniciar a sessão segura.
                    </p>
                  </div>


                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">E-mail ou ID</label>
                      <div className="relative group">
                        <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={20} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all font-medium"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>


                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span className="text-sm">Verificando...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">Continuar</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}


              {/* ETAPA 2: SENHA (AUTENTICAÇÃO) */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Avatar de Boas-vindas (Efeito WOW) */}
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200">
                         {/* Placeholder Avatar - Em prod viria do banco */}
                        <img src={`https://ui-avatars.com/api/?name=${email}&background=random`} alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-[#1C1C1E] w-4 h-4 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Bem-vindo(a),</p>
                      <p className="font-bold text-sm truncate">{email.split('@')[0]}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="ml-auto text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Trocar
                    </button>
                  </div>


                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center ml-1">
                         <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Senha</label>
                         <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Esqueceu?</a>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={20} />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          autoFocus
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all font-medium tracking-widest"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>


                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span className="text-sm">Autenticando...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">Acessar Plataforma</span>
                          <ShieldCheck size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}


            </AnimatePresence>
          </div>


          {/* Footer do Card */}
          <div className="bg-gray-50 dark:bg-black/20 p-4 border-t border-gray-100 dark:border-white/5 text-center">
             <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <AlertCircle size={12} />
                <span>Problemas no acesso?</span>
                <a href="mailto:contato@abridoficial.org" className="text-gray-900 dark:text-white font-bold hover:underline">Fale com o Suporte</a>
             </p>
          </div>
        </div>


        {/* Footer da Página */}
        <div className="mt-8 flex justify-center gap-6 opacity-60">
           <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all cursor-help" title="Conformidade LGPD">
              <CheckCircle2 size={14} className="text-green-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">LGPD Compliant</span>
           </div>
           <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
           <div className="flex items-center gap-1.5 hover:opacity-100 transition-opacity cursor-pointer">
              <HelpCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Suporte 24/7</span>
           </div>
        </div>


      </motion.div>
    </div>
  );
}


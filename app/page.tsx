'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, ArrowRight, CheckCircle2, Globe, ShieldCheck, 
  Cpu, Leaf, MessageCircle, Instagram, Youtube, Mail, MapPin, Users, 
  Award, BookOpen, MonitorPlay, Mic, DollarSign, Lightbulb, Play, 
  Lock, ChevronLeft, ChevronRight as ChevronRightIcon, Expand
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- HELPER ICONS ---
function UsersIcon(props: any) { return <Users {...props} /> }
function IdCardIcon({ size, strokeWidth, ...props }: any) { 
  return (
    <div 
      {...props} 
      className={`border-2 border-current rounded-md flex items-center justify-center text-[8px] font-bold ${props.className || ''}`}
      style={{ width: size || 24, height: (size || 24) * 0.6 }}
    >
      ID
    </div>
  ) 
}

// --- CONFIGURAÇÃO PARA O EVENTO ---
const EVENT_URLS = {
  LOGIN: "https://auth.abridedu.org", // Link direto para o Vault de Login do Evento
};

// --- DADOS ---
const NAV_LINKS = [
  { name: 'Institucional', href: '#sobre' },
  { name: 'Pilares', href: '#pilares' },
  { name: 'Cursos', href: '#cursos' },
  { name: 'Liderança', href: '#curadores' },
  { name: 'Mídia', href: '#midia' },
  { name: 'Galeria', href: '#galeria' },
  { name: 'FAQ', href: '#faq' },
];

const MISSION_POINTS = [
  { text: "Apoiar influenciadores e empreendedores digitais.", icon: Users },
  { text: "Promover acesso a tecnologias e inovações.", icon: Cpu },
  { text: "Incentivar o empreendedorismo digital sustentável.", icon: Leaf },
  { text: "Defender a ética, a transparência e a liberdade de expressão.", icon: ShieldCheck },
  { text: "Criar o CNID – Cadastro Nacional do Influenciador Digital.", icon: IdCardIcon },
  { text: "Fomentar a pesquisa e o desenvolvimento de novas tecnologias.", icon: Lightbulb },
];

const PILLARS = [
  { title: "Transparência", text: "Construindo confiança através da clareza em cada processo e decisão.", image: "https://scontent.cdninstagram.com/v/t51.82787-15/573372273_17942910819084243_6811544258959542197_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=Mzc1NzE3OTQ5NzA2NzEyMDkwMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=f4JtHrNGx0cQ7kNvwENucyv&_nc_oc=AdlwNPUcgYkBiIUyINjRHm-i1ZY_czwz2ZYTPFTKllrT53M_ImZKMuTU-MSNb4xFIiDVOalhCVFb7OrfHR2r50al&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=4RQYQtigo12LzG4EgKa6CA&oh=00_AfiUCavt2TKkxhInHHwQTSc4yhqGrgOIgf2vpjsrDXXIEQ&oe=692F7261" },
  { title: "Ética", text: "Orientando relações com integridade e responsabilidade social.", image: "https://scontent.cdninstagram.com/v/t51.82787-15/570108990_17942910828084243_1497937588358489362_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzc1NzE3OTQ5NzAzMzYyMTYwOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=ZlflrOLFgsQQ7kNvwG_NxLD&_nc_oc=AdmQ-BxRnopM1cngplJ3Yn6xyTRjpY1Bavh5YnYMDn-VdWUHQF08dO8s2hDSn14SKPKWA4yY2AA-nJMyoshEIaVN&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=4RQYQtigo12LzG4EgKa6CA&oh=00_Afg1RdEioQXID4shxY-Ybwf17T6cRXktpewtiYRok8nhng&oe=692F62F3" },
  { title: "Inovação", text: "Transformando o mercado com tecnologia de ponta para potencializar vozes.", image: "https://scontent.cdninstagram.com/v/t51.82787-15/573812422_17942910840084243_1564525419353301308_n.jpg?stp=dst-jpg_e35_p720x720_tt6&_nc_cat=103&ig_cache_key=Mzc1NzE3OTQ5NzA1ODc0ODgxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=QybrrTKnznYQ7kNvwFhch80&_nc_oc=Adml95QfldXg2ymatt-QgU4MhWJmDgIHNCD1EX0nfqRN-HL-RDfgdBfM381Jukt8LzuL9DEIASzRHuEKt_WvhgLd&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=4RQYQtigo12LzG4EgKa6CA&oh=00_AfgE5qU0xu5yr-PAkhtf0jPseo0m-WRK9GZJyOzVRvzlRw&oe=692F605F" },
  { title: "Representatividade", text: "Garantindo que todas as vozes sejam ouvidas e a diversidade respeitada.", image: "https://scontent.cdninstagram.com/v/t51.82787-15/573613619_17942910849084243_5058649287877003873_n.jpg?stp=dst-jpg_e35_p720x720_tt6&_nc_cat=101&ig_cache_key=Mzc1NzE3OTQ5NzA0MTk2NjA2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=7ddxwiMpbPEQ7kNvwFNJphF&_nc_oc=AdmxMfUvYQzCpekLgct-UE6WU3RHbfzPlt2QmNEbWdwMrNSTgBR7LVUR5Qfbs0cQZJNGHVR_SAd-86kNprQB8KeQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=4RQYQtigo12LzG4EgKa6CA&oh=00_AfhfzAyDeSbKxYH254k89_7a2m4T6wUcBqERttp2qT5uBw&oe=692F75A6" }
];

const COURSES = [
  { title: "Jornalismo Digital", icon: BookOpen, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop", objective: "Capacitar criadores de conteúdo para atuarem como jornalistas digitais responsáveis.", content: ["Princípios básicos", "Fact-checking", "Estruturação de notícia", "Cobertura ética"] },
  { title: "Ética na Influência", icon: ShieldCheck, image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000&auto=format&fit=crop", objective: "Formar influenciadores conscientes.", content: ["Profissionalismo", "Responsabilidade social", "Ética na publicidade", "Limites legais"] },
  { title: "Conteúdo High Performance", icon: MonitorPlay, image: "https://i.ibb.co/xtYDhKDy/capa-abrid-estilo-flix.png", objective: "Ensinar a produzir conteúdo que prende atenção e converte.", content: ["Roteiros virais", "Gravação Mobile", "Edição Reels/TikTok", "Análise de métricas"] },
  { title: "Branding Pessoal", icon: Users, image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop", objective: "Ajudar o influencer a se posicionar como marca.", content: ["Identidade visual", "Nicho de mercado", "Branding", "Gestão de crises"] },
  { title: "Monetização e Negócios", icon: DollarSign, image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop", objective: "Ensinar a ganhar dinheiro de forma estruturada e sustentável.", content: ["Fontes de receita", "Precificação", "Contratos", "Finanças básicas"] },
  { title: "Gestão de Comunidade", icon: MessageCircle, image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop", objective: "Construir audiência fiel.", content: ["Seguidores vs Comunidade", "Engajamento", "Gestão de haters", "Impacto positivo"] }
];

const CELEBRITY_PHOTOS = [
  "https://i.ibb.co/qY4bSXxQ/1.jpg", "https://i.ibb.co/nNLSZMCG/2.jpg", "https://i.ibb.co/cSKwVbng/3.jpg", "https://i.ibb.co/Y4MNZwF5/4.jpg",
  "https://i.ibb.co/b5wjd5JX/5.jpg", "https://i.ibb.co/SX9TDwYh/6.jpg", "https://i.ibb.co/V05KCbMx/7.jpg", "https://i.ibb.co/p6mzsDwm/8.jpg",
  "https://i.ibb.co/CpZTbMf6/9.jpg", "https://i.ibb.co/xqSM6dGJ/10.jpg", "https://i.ibb.co/xt66FNnG/11.jpg", "https://i.ibb.co/0jHSyKcd/12.jpg",
  "https://i.ibb.co/qYcbDbvr/12a.jpg", "https://i.ibb.co/Zty25KB/13.jpg", "https://i.ibb.co/pj7fKrDw/14.jpg", "https://i.ibb.co/scjSzg3/15.jpg",
  "https://i.ibb.co/FbfGWNQc/16.jpg", "https://i.ibb.co/rGVyD6m2/17.jpg", "https://i.ibb.co/8n60zRQ4/18.jpg", "https://i.ibb.co/8RsyF8q/19.jpg",
  "https://i.ibb.co/nqN2jL1z/20.jpg", "https://i.ibb.co/wZT3kDPk/21.jpg", "https://i.ibb.co/Y7wj2x5b/21a.jpg", "https://i.ibb.co/q3m76nGY/22.jpg",
  "https://i.ibb.co/HDySfBbv/23.jpg", "https://i.ibb.co/4RMWmrRm/24.jpg", "https://i.ibb.co/TqK74v65/25.jpg", "https://i.ibb.co/7J5KGff6/26.jpg",
  "https://i.ibb.co/272sQzx8/27.jpg", "https://i.ibb.co/TxQMhc1v/28.jpg", "https://i.ibb.co/2122dVw6/29.jpg", "https://i.ibb.co/d4d2tDBj/30.jpg",
  "https://i.ibb.co/s9L5Y2yQ/31.jpg", "https://i.ibb.co/CpCpyz4Q/31a.jpg", "https://i.ibb.co/gLHKjZVp/32.jpg", "https://i.ibb.co/TDBH6Xsm/33.jpg",
  "https://i.ibb.co/LzPS90H0/34.jpg", "https://i.ibb.co/k2RZNVrT/35.jpg", "https://i.ibb.co/gFPCB1Gw/36.jpg", "https://i.ibb.co/WW3P0s2d/40.jpg",
  "https://i.ibb.co/twxXZZ2W/41.jpg", "https://i.ibb.co/Z6J5Rp6j/42.jpg", "https://i.ibb.co/fV4kw4tk/43.jpg", "https://i.ibb.co/Y7wj2x5b/21a.jpg",
  "https://i.ibb.co/b5wjd5JX/5.jpg", "https://i.ibb.co/hS7j0vH/DSC01274.jpg", "https://i.ibb.co/gbkKfH0n/DSC01780.jpg", "https://i.ibb.co/yBdHQrY8/DSC01805.jpg",
  "https://i.ibb.co/7t3441K0/DSC01851.jpg", "https://i.ibb.co/jZjyyzTb/DSC01859.jpg"
];

const FAQS = [
  { q: "O que é o CNID e por que eu preciso dele?", a: "O Cadastro Nacional do Influenciador Digital é o documento que profissionaliza sua atuação, garantindo segurança jurídica e credibilidade perante marcas e agências." },
  { q: "Os cursos são reconhecidos?", a: "Sim, todos os cursos da ABRID Lab possuem certificação validada pelo nosso conselho acadêmico e parceiros institucionais." },
  { q: "Como funciona a validação de perfil?", a: "A validação é feita através de uma análise criteriosa do seu conteúdo e engajamento, garantindo que você segue os princípios éticos da associação." },
  { q: "Quais os benefícios de ser associado?", a: "Acesso a suporte jurídico, descontos em ferramentas, networking com grandes marcas e participação exclusiva em eventos da ABRID." },
  { q: "Os cursos são presenciais ou online?", a: "Nossos cursos são 100% online, com aulas gravadas em alta definição e encontros ao vivo para mentoria, permitindo que você estude de qualquer lugar." },
  { q: "Quais são as formas de pagamento?", a: "Aceitamos pagamentos via cartão de crédito em até 12x, boleto bancário e PIX. Para empresas e compras em grupo, temos condições especiais." },
  { q: "Por quanto tempo tenho acesso ao conteúdo?", a: "O acesso aos cursos e às atualizações é garantido pelo período de 12 meses a partir da data da matrícula, podendo ser renovado." },
  { q: "Como funciona o suporte ao aluno?", a: "Dispomos de um canal exclusivo de suporte dentro da plataforma, além de atendimento via e-mail e WhatsApp para questões administrativas." }
];

const AWARDS = [
  { id: 1, videoId: "Wa45qCQAi_8", title: "Prêmio Destaque 2021", desc: "Inovação Digital" },
  { id: 2, videoId: "8gy8TwD_aSQ", title: "Prêmio Destaque 2022", desc: "Impacto Social" },
  { id: 3, videoId: "GzodSvmk_Rw", title: "Prêmio Destaque 2023", desc: "Educação e Ética" },
  { id: 4, videoId: "Wa45qCQAi_8", title: "Prêmio Destaque 2024", desc: "Comunicação" },
  { id: 5, videoId: "8gy8TwD_aSQ", title: "Prêmio Destaque 2025", desc: "Tecnologia" },
];

// -- COMPONENTES AUXILIARES --

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center tracking-tight text-[#1D1D1F]">
    {children}
  </h2>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginNavigation = () => {
    if (typeof window !== 'undefined') {
      window.location.href = EVENT_URLS.LOGIN;
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="https://i.ibb.co/9H8DPBS6/logotipo-abrid-lab.png" 
            alt="ABRID Lab" 
            className="h-10 w-10 object-contain rounded-lg"
          />
          <div className={`text-xl tracking-tight leading-none ${scrolled ? 'text-gray-900' : 'text-white'} transition-colors`}>
            <span className="font-bold">ABRID</span> <span className="font-thin">Lab</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-xs font-medium uppercase tracking-widest transition-colors ${scrolled ? 'text-gray-600 hover:text-black' : 'text-gray-200 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={handleLoginNavigation}
            className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform"
          >
            Fazer login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenu(!mobileMenu)} className={`md:hidden ${scrolled ? 'text-gray-900' : 'text-white'}`}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="text-lg font-medium text-gray-800">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- MODAIS ---

const CourseModal = ({ course, onClose, onRegister }: { course: any, onClose: () => void, onRegister: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} 
      animate={{ scale: 1, y: 0 }} 
      exit={{ scale: 0.9, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors z-10">
        <X size={20} className="text-black" />
      </button>
      
      {/* Imagem do Curso no Modal */}
      <div className="h-48 relative">
        <img 
          src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"} 
          alt={course.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
          <h3 className="text-3xl font-bold text-white">{course.title}</h3>
        </div>
      </div>
      
      <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <h4 className="text-sm font-bold uppercase text-blue-600 mb-2 flex items-center gap-2">
            <Globe size={16} /> Objetivo
          </h4>
          <p className="text-gray-600 leading-relaxed">{course.objective}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-bold uppercase text-blue-600 mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} /> Conteúdo Programático
          </h4>
          <ul className="space-y-3">
            {course.content.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onRegister}
            className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Fazer Pré-inscrição <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const VideoModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9 }} 
      animate={{ scale: 1 }} 
      exit={{ scale: 0.9 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative"
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors z-10">
        <X size={24} />
      </button>
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/Wa45qCQAi_8?autoplay=1" 
        title="ABRID Institucional" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </motion.div>
  </motion.div>
);

const GalleryModal = ({ photo, photos, onClose }: { photo: string, photos: string[], onClose: () => void }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(photos.indexOf(photo));

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-40"
        >
          <ChevronLeft size={32} />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-40"
        >
          <ChevronRightIcon size={32} />
        </button>

        {/* Image */}
        <motion.img
          key={currentPhotoIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={photos[currentPhotoIndex]}
          alt="Celebridade ABRID"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
        />
        
        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm font-mono">
          {currentPhotoIndex + 1} / {photos.length}
        </div>
      </div>
    </motion.div>
  );
};

const WaitlistModal = ({ onClose }: { onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center sticky top-0">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Lista de Espera de Alunos</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 mt-1">
              <Lock className="w-3 h-3" /> Ambiente Seguro (SSL 256-bit)
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Solicitação Recebida!</h3>
              <p className="text-gray-500">Agradecemos seu interesse. Nossa equipe entrará em contato em breve.</p>
            </div>
          ) : (
            <>
              {/* IFRAME INVISÍVEL PARA SUBMISSÃO SILENCIOSA */}
              <iframe name="hidden_iframe" id="hidden_iframe" style={{display:'none'}} onLoad={() => {}}></iframe>
              
              {/* FORMULÁRIO GOOGLE CONECTADO */}
              <form 
                action="https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/formResponse" 
                method="post" 
                target="hidden_iframe"
                onSubmit={() => setSubmitted(true)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">1. Identificação Profissional</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-500">Nome Completo</label>
                      <input 
                        type="text" 
                        name="entry.1652671836"
                        required
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        placeholder="Seu nome oficial"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-500">Profissão Atual</label>
                      <input 
                        type="text" 
                        name="entry.54145111"
                        required
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        placeholder="Ex: Jornalista, Advogado..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-500">Melhor E-mail</label>
                      <input 
                        type="email" 
                        name="entry.309771252"
                        required
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        placeholder="nome@email.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-500">WhatsApp</label>
                      <input 
                        type="tel" 
                        name="entry.2110802830"
                        required
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">2. Definição de Perfil</h4>
                  <select name="entry.47956087" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all">
                      <option value="Iniciante">Iniciante</option>
                      <option value="Criador de Conteúdo">Criador de Conteúdo</option>
                      <option value="Influenciador Digital">Influenciador Digital</option>
                      <option value="Comunicador Digital">Comunicador Digital</option>
                   </select>
                </div>

                <hr className="border-gray-100" />

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      required
                      className="mt-1 w-4 h-4 rounded text-blue-900 focus:ring-blue-900 accent-black"
                    />
                    <div className="text-xs text-gray-600 leading-relaxed">
                      Concordo com os <a href="#" className="underline text-blue-800">Termos de Uso</a> e <a href="#" className="underline text-blue-800">Política de Privacidade</a>. 
                      Estou ciente que meus dados serão armazenados em ambiente seguro para fins de triagem e comunicação sobre o ABRID Lab, em total conformidade com a <strong>LGPD (Lei nº 13.709)</strong>.
                    </div>
                  </label>
                </div>

                <button type="submit" className="w-full bg-black text-white text-lg py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-lg">
                  Entrar para a Lista de Espera
                </button>

              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-blue-600 transition-colors group"
      >
        <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600">{q}</span>
        <ChevronDown className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 leading-relaxed text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTE PREMIAÇÕES 3D (COVERFLOW INTERATIVO) ---
const AwardsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    // Timer ajustado para 7 segundos
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AWARDS.length);
    }, 7000); 
    return () => clearInterval(timer);
  }, [isPaused]);

  const getPosition = (index: number) => {
    const diff = (index - currentIndex + AWARDS.length) % AWARDS.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'far-right';
    if (diff === AWARDS.length - 1) return 'left';
    if (diff === AWARDS.length - 2) return 'far-left';
    return 'hidden';
  };

  return (
    <div 
      className="relative h-[650px] w-full flex flex-col items-center justify-center overflow-hidden py-10"
    >
      <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
        {AWARDS.map((award, index) => {
          const pos = getPosition(index);
          const isCenter = pos === 'center';
          
          return (
            <motion.div
              key={award.id}
              initial={false}
              animate={{
                scale: isCenter ? 1.1 : (pos === 'left' || pos === 'right') ? 0.85 : 0.7,
                x: isCenter ? 0 : 
                   pos === 'left' ? -320 : 
                   pos === 'right' ? 320 : 
                   pos === 'far-left' ? -580 : 
                   580, 
                opacity: isCenter ? 1 : (pos === 'left' || pos === 'right') ? 0.6 : 0.3,
                filter: isCenter ? 'blur(0px)' : (pos === 'left' || pos === 'right') ? 'blur(5px)' : 'blur(8px)',
                zIndex: isCenter ? 20 : (pos === 'left' || pos === 'right') ? 10 : 5,
                rotateY: isCenter ? 0 : 
                         pos === 'left' ? 15 : 
                         pos === 'right' ? -15 : 
                         pos === 'far-left' ? 25 : -25
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              // Eventos de pausa aplicados apenas no card central
              onMouseEnter={() => isCenter && setIsPaused(true)}
              onMouseLeave={() => isCenter && setIsPaused(false)}
              className={`absolute w-[280px] aspect-[9/16] bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800`}
              style={{ display: pos === 'hidden' ? 'none' : 'flex' }}
            >
              <div className="relative w-full h-full">
                 {/* Video Iframe */}
                 <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${award.videoId}?controls=1&showinfo=0&rel=0`} 
                    title={award.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className={`w-full h-full object-cover ${isCenter ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  ></iframe>
                 
                 {/* Overlay para não-centrais */}
                 {!isCenter && <div className="absolute inset-0 bg-black/50 z-10"></div>}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Informações abaixo do card */}
      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-8 z-30"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{AWARDS[currentIndex].title}</h3>
        <p className="text-gray-500 uppercase tracking-widest text-sm">{AWARDS[currentIndex].desc}</p>
      </motion.div>
    </div>
  );
};

// --- COMPONENTE CARROSSEL INFINITO (MARQUEE) ---
const Marquee = ({ children, direction = 'left', speed = 30 }: { children: React.ReactNode, direction?: 'left' | 'right', speed?: number }) => {
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';
  
  return (
    <div className="overflow-hidden flex w-full group py-10"> {/* Adicionado py-10 para evitar clipping no scale */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-${direction} {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: ${animationName} ${speed}s linear infinite;
        }
        .group:hover .marquee-track-${direction} {
          animation-play-state: paused;
        }
      `}} />
      
      <div className={`marquee-track-${direction}`}>
        {children}
        {children} 
        {children} 
      </div>
    </div>
  );
};

// --- COMPONENTE GALERIA MOSAICO (STREAMING WALL) ---
const MasonryGallery = ({ onPhotoClick }: { onPhotoClick: (photo: string) => void }) => {
  const chunkSize = Math.ceil(CELEBRITY_PHOTOS.length / 3);
  const row1 = CELEBRITY_PHOTOS.slice(0, chunkSize);
  const row2 = CELEBRITY_PHOTOS.slice(chunkSize, chunkSize * 2);
  const row3 = CELEBRITY_PHOTOS.slice(chunkSize * 2);

  const PhotoCard = ({ photo }: { photo: string }) => (
    <motion.div 
      className="w-[160px] h-[220px] md:w-[200px] md:h-[280px] rounded-xl overflow-hidden cursor-pointer relative group shrink-0 border-2 border-transparent hover:border-white/50 shadow-lg transition-all"
      whileHover={{ scale: 1.05, zIndex: 10, filter: "brightness(1.1)" }}
      onClick={() => onPhotoClick(photo)}
    >
      <img 
        src={photo} 
        alt="Celebridade ABRID" 
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Overlay sutil de brilho no hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
      
      {/* Ícone de Expandir no Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
         <Expand className="text-white drop-shadow-lg" size={32} />
      </div>
    </motion.div>
  );

  return (
    <div className="w-full overflow-hidden py-12 bg-gray-900 relative">
       {/* Background Decorativo */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
       <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-5 pointer-events-none"></div>

       <div className="flex flex-col gap-2 relative z-10">
         
         {/* Linha 1 - Esquerda (Lento) */}
         <Marquee direction="left" speed={120}>
            <div className="flex gap-4 px-2">
              {row1.map((photo, i) => <PhotoCard key={`r1-${i}`} photo={photo} />)}
            </div>
         </Marquee>

         {/* Linha 2 - Direita (Normal) - Destaque Central */}
         <Marquee direction="right" speed={100}>
            <div className="flex gap-4 px-2">
              {row2.map((photo, i) => <PhotoCard key={`r2-${i}`} photo={photo} />)}
            </div>
         </Marquee>

         {/* Linha 3 - Esquerda (Rápido) */}
         <Marquee direction="left" speed={90}>
            <div className="flex gap-4 px-2">
              {row3.map((photo, i) => <PhotoCard key={`r3-${i}`} photo={photo} />)}
            </div>
         </Marquee>
       </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Parallax Hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Hide Default Scrollbar (Global Style) */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      
      <Navbar />

      {/* --- HERO SECTION (Com Vídeo Estável) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10"></div> {/* Overlay mais forte para legibilidade */}
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="w-full h-full object-cover opacity-50"
           >
             <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
           </video>
           {/* Fallback Image */}
           <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm text-[10px] font-bold tracking-widest uppercase text-white/90 mb-8">
              Secretaria Executiva do Congresso Nacional
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-white drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Crie. Inspire.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Transforme.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed mb-12 drop-shadow-lg">
              ABRID Lab: O organismo autorregulamentador que forma a elite da influência digital com ética e propósito.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <button 
                onClick={() => setVideoModalOpen(true)}
                className="w-full md:w-auto px-10 py-4 bg-white text-black rounded-full font-medium text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Conheça a ABRID <Play size={18} fill="currentColor" />
              </button>
              <button 
                onClick={() => document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full md:w-auto px-10 py-4 bg-transparent border border-white/50 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all backdrop-blur-sm shadow-lg"
              >
                Ver Cursos
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MISSÃO (Ícones Melhorados) --- */}
      <section id="sobre" className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              A ABRID nasce para fortalecer, profissionalizar e conectar o ecossistema da influência digital no Brasil e no mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MISSION_POINTS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group flex flex-col items-start"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-lg font-medium text-gray-900 leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PILARES (Carrossel Intermitente) --- */}
      <section id="pilares" className="py-12 bg-[#F5F5F7] overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <SectionTitle>Pilares da ABRID</SectionTitle>
          <p className="text-center text-gray-500 max-w-2xl mx-auto -mt-4">
            Valores que orientam cada projeto, diálogo e decisão para fortalecer o futuro da influência.
          </p>
        </div>

        <Marquee direction="left" speed={50}>
          <div className="flex gap-6 px-6">
            {PILLARS.map((pilar, idx) => (
              <div 
                key={idx}
                className="relative h-[400px] w-[300px] rounded-3xl overflow-hidden cursor-pointer group/card shadow-lg shrink-0"
              >
                <img src={pilar.image} alt={pilar.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end transition-transform duration-500 group-hover/card:-translate-y-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{pilar.title}</h3>
                  <div className="h-1 w-12 bg-white rounded-full"></div>
                </div>
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover/card:translate-y-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pilar.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{pilar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </section>

      {/* --- CURSOS (GRID APPLE STYLE) --- */}
      <section id="cursos" className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle>Formação & Certificação</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCourse(course)}
                className="bg-white rounded-3xl p-0 shadow-sm border border-gray-100 hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full overflow-hidden"
              >
                <div className="h-48 w-full relative">
                    <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900">
                        <course.icon size={20} strokeWidth={1.5} />
                    </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{course.objective}</p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm gap-2 mt-auto">
                    Ver Detalhes <ArrowRight size={16} />
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRAINERS (Zigue-Zague Apple Style) --- */}
      <section id="curadores" className="py-12 bg-[#F5F5F7]">
        <div className="container mx-auto px-6 md:px-12 space-y-32">
          {/* Stavros */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex justify-center relative">
               <div className="w-full max-w-md aspect-[3/4] bg-gradient-to-b from-gray-200 to-transparent rounded-[3rem] overflow-hidden relative shadow-2xl group">
                 <img 
                   src="/stavros.png" 
                   alt="Prof. Dr. Stavros Panagiotis" 
                   className="w-full h-full object-cover mix-blend-multiply transition-all duration-700 scale-105 cursor-pointer"
                   onError={(e: any) => e.target.src = "https://placehold.co/400x500/e2e2e2/666?text=Stavros+Foto"}
                 />
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center gap-2 text-gray-500 font-medium text-sm uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> Direção Acadêmica
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Prof. Dr. Stavros Xanthopoylos</h2>
              <p className="text-xl font-serif text-gray-600 italic">"A excelência não é um ato, é um hábito. Trazemos o rigor da FGV e do MIT para o mundo digital."</p>
              <div className="text-gray-600 space-y-4 text-sm leading-relaxed text-justify">
                <p>Doutor em Administração pela FGV-Eaesp e Engenheiro pela USP Politécnica. Há mais de 30 anos na vanguarda da educação, atua como Vice-Diretor do IDE da Fundação Getulio Vargas.</p>
                <p>Reconhecido internacionalmente, integrou o conselho do Open Educational Consortium do MIT e foi premiado com o Learning Impact Awards.</p>
              </div>
            </div>
          </div>

          {/* Edu */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="w-full max-w-md aspect-[3/4] bg-gradient-to-b from-gray-200 to-transparent rounded-[3rem] overflow-hidden relative shadow-2xl group">
                 <img 
                   src="/edu.png" 
                   alt="Edu Kopernick" 
                   className="w-full h-full object-cover mix-blend-multiply transition-all duration-700 scale-105 cursor-pointer"
                   onError={(e: any) => e.target.src = "https://placehold.co/400x500/e2e2e2/666?text=Edu+Foto"}
                 />
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-left md:text-right">
              <div className="flex items-center md:justify-end gap-2 text-gray-500 font-medium text-sm uppercase tracking-wider">
                <Mic className="w-4 h-4" /> Direção de Comunicação
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Edu Kopernick</h2>
              <p className="text-xl font-serif text-gray-600 italic">"Traduzir a responsabilidade jornalística para a velocidade das redes é o desafio da nossa era."</p>
              <div className="text-gray-600 space-y-4 text-sm leading-relaxed text-justify md:text-right ml-auto">
                <p>Jornalista especialista em Comunicação Organizacional, Edu é a ponte entre a mídia tradicional e os novos criadores.</p>
                <p>No ABRID Lab, coordena a formação prática, ensinando como construir autoridade, credibilidade e relevância em um mercado saturado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MÍDIA (Carrossel Marquee - LENTO) --- */}
      <section id="midia" className="py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">ABRID na Mídia</h2>
        </div>

        {/* Padding vertical extra para evitar clipping no scale */}
        <Marquee direction="right" speed={150}>
          <div className="flex gap-8 px-6">
            {[
              "https://video.wixstatic.com/video/6e1ca5_65722a3ffbca4045a03d06c713e7668a/480p/mp4/file.mp4",
              "https://video.wixstatic.com/video/6e1ca5_892bfca19ae444c3be608a5aa28fdb34/720p/mp4/file.mp4"
            ].map((url, i) => (
              <div key={`wix-${i}`} className="flex flex-col gap-3">
                <div className="w-[400px] aspect-video rounded-2xl overflow-hidden shadow-lg bg-black shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer group relative">
                   <video controls className="w-full h-full object-cover">
                     <source src={url} type="video/mp4" />
                   </video>
                </div>
                {/* Título abaixo do card */}
                <p className="text-center text-sm font-bold text-gray-600">Matéria Oficial {i+1}</p>
              </div>
            ))}
            
            {/* Placeholders Reais */}
             <div className="flex flex-col gap-3">
                <div className="w-[400px] aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-900 shrink-0 flex items-center justify-center text-white font-bold transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1550355191-aa8a80b41353?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="CNN" />
                  <span className="absolute">Reportagem CNN</span>
                </div>
                <p className="text-center text-sm font-bold text-gray-600">CNN Business</p>
             </div>
             
             <div className="flex flex-col gap-3">
                <div className="w-[400px] aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-900 shrink-0 flex items-center justify-center text-white font-bold transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="Forbes" />
                  <span className="absolute">Entrevista Forbes</span>
                </div>
                <p className="text-center text-sm font-bold text-gray-600">Forbes Under 30</p>
             </div>
          </div>
        </Marquee>
      </section>

      {/* --- GALERIA DE CELEBRIDADES (NOVA SEÇÃO) --- */}
      <section id="galeria" className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-purple-600 font-bold tracking-widest uppercase text-xs">Hall da Fama</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">Galeria de Celebridades ABRID</h2>
            <p className="text-gray-500">Grandes nomes que fazem parte da nossa história e impulsionam o mercado digital.</p>
          </div>
          
          <MasonryGallery onPhotoClick={setSelectedPhoto} />
        </div>
      </section>

      {/* --- PREMIAÇÕES (Coverflow 3D Interativo) --- */}
      <section className="py-12 bg-[#F5F5F7] overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle>Premiações</SectionTitle>
          <AwardsCarousel />
        </div>
      </section>

      {/* --- POR QUE ESTUDAR NA ABRID? (NOVA SEÇÃO) --- */}
      <section className="py-12 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs mb-4 block">Diferencial Exclusivo</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Por que a ABRID é a sua <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">melhor escolha?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Mais do que cursos, oferecemos uma carreira. Somos a única instituição ligada diretamente ao Congresso Nacional, garantindo que seu certificado (CNID) tenha peso real no mercado. Aprenda com quem define as regras do jogo e faça parte da elite que está profissionalizando a influência no Brasil.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
              <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Segurança Jurídica</h3>
                <p className="text-gray-400 text-sm">Atue com respaldo legal e proteção contra riscos digitais.</p>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Award className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Certificação Oficial</h3>
                <p className="text-gray-400 text-sm">O único documento reconhecido pelas autoridades do setor.</p>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <Users className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Networking de Elite</h3>
                <p className="text-gray-400 text-sm">Conecte-se com grandes marcas e os maiores nomes do mercado.</p>
              </div>
            </div>

            <button 
              onClick={() => setWaitlistOpen(true)}
              className="px-12 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 mx-auto"
            >
              Entrar para a Lista de Espera <ArrowRight size={24} />
            </button>
            <p className="mt-4 text-sm text-gray-500">Vagas limitadas para a próxima turma.</p>
          </div>
        </div>
      </section>

      {/* --- FAQ (ACCORDION) --- */}
      <section id="faq" className="py-12 bg-[#F5F5F7]">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionTitle>Dúvidas Frequentes</SectionTitle>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1D1D1F] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Logos Oficiais */}
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest">Realização</h4>
              <div className="flex flex-wrap gap-6 items-center">
                 <img src="https://i.ibb.co/0183jn3/Abrid2.png" alt="Abrid Lab" className="h-10 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                 <img src="https://i.ibb.co/5hdXty5R/CNID.png" alt="Abrid Colorida" className="h-10 object-contain" />
                 <img src="https://i.ibb.co/NdVNnhf4/abrid.png" alt="CNID" className="h-10 object-contain" />
              </div>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-6">Contato</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="shrink-0 mt-0.5" size={16} />
                  <span>Av. Andrômeda, 885, Alphaville Empresarial<br/>Barueri - SP, CEP: 06.473-000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} />
                  <a href="mailto:contato@abridoficial.org" className="hover:text-white transition-colors">contato@abridoficial.org</a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-6">Social</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/abrid_org/" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/@Abridorg" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-red-600 transition-all">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; 2025 Associação Brasileira de Influência Digital.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals Render */}
      <AnimatePresence>
        {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} onRegister={() => { setSelectedCourse(null); setWaitlistOpen(true); }} />}
        {videoModalOpen && <VideoModal onClose={() => setVideoModalOpen(false)} />}
        {waitlistOpen && <WaitlistModal onClose={() => setWaitlistOpen(false)} />}
        {selectedPhoto && <GalleryModal photo={selectedPhoto} photos={CELEBRITY_PHOTOS} onClose={() => setSelectedPhoto(null)} />}
      </AnimatePresence>
    </div>
  );
}
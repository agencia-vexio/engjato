"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import { ChevronUp, Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import ServicesSection from "./_componentes/services-section";
import ServicePortfolio from "./_componentes/PortfolioSection ";
import Footer from "./_componentes/footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Refs for sections to check if they're in view
  const whoWeAreRef = useRef(null);
  const contactRef = useRef(null);

  const whoWeAreInView = useInView(whoWeAreRef, { once: true, amount: 0.3 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.3 });

  // Hero slider images
  const heroImages = [
    "/imgJato.jpg",
    "/imgJato2.jpg",
    "/imgJato3.jpg",
    "/imgJato4.png",
  ];

  // Client logos
  const clientLogos = [
    "/clientes/aguaBonita.png",
    "/clientes/alcoeste.png",
    "/clientes/allteckLogo.png",
    "/clientes/enersugar.png",
    "/clientes/granelli.png",
    "/clientes/olfar.png",
    "/clientes/selecta.png",
    "/clientes/tereos.png",
    "/clientes/uisa.png",
    "/clientes/oleoplan.png",
  ];

  // Auto-advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Show/hide scroll to top button
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowScrollTop(latest > 500);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { name: "Inicio", href: "#" },
    { name: "Sobre", href: "#about" },
    { name: "Serviços", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <div className="relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#d3d3d3] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between md:ml-24 md:mr-24">
            <Image
              src="/logo.png"
              alt="logo engjato amarelo e preto"
              width={200}
              height={180}
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary font-medium py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}{" "}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* sessao Hero */}
      <section className="relative h-screen pt-16">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                activeSlide === index ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Industrial sandblasting service ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-yellow-900/90" />
            </div>
          ))}
        </div>

        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start md:ml-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Jateamento Industrial de Alta Performance!
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Soluções Inovadoras em Preparação e Acabamento de Superfícies, Com
              Desempenho Imbatível para Todas as Suas Necessidades Industriais!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-semibold">
                <Link href="#services">Nossos Serviços</Link>
              </Button>
              <Button
                size="lg"
                className="text-white bg-yellow-500 border-white hover:bg-yellow-600/65"
              >
                <Link href="#contact">Solicite um Orçamento</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Slider indicators 
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                activeSlide === index ? "bg-white scale-125" : "bg-white/50"
              )}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>*/}
      </section>

      {/* sessao quem somos */}
      <section id="about" className="py-20 bg-gray-50" ref={whoWeAreRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre a ENGJATO
            </h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 mb-8">
              Com mais de 15 anos de experiência, a ENGJATO estabeleceu como
              líder na indústria de jateamento industrial. Nós combinar
              tecnologia de ponta e especializado para Forneçer resultados
              superiores para projetos de qualquer escala.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Nossa equipe de profissionais certificados está comprometida com a
              excelência, segurança e responsabilidade ambiental em todos os
              projetos que empreender.
            </p>
          </motion.div>

          {/**<motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={whoWeAreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#0a0808] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">+15</span>
              </div>
              <span className="text-xl font-bold mb-4">
                Anos de experiência
              </span>
              <p className="text-gray-600">
                Há mais de 15 anos de experiência no mercado, oferecendo
                excelência e inovação em nossos serviços.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#0a0808] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">+500</span>
              </div>

              <span className="text-xl font-bold mb-4">Projetos Entregues</span>
              <p className="text-gray-600">
                Entregou com sucesso centenas de projetos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#0a0808] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">100%</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Cliêntes Satisfeitos</h3>
              <p className="text-gray-600">
                Comprometidos em entregar resultados excepcionais que excedam
                Expectativas.
              </p>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* sessao serviços */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* sessao clientes carrossel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-4">
              Confiável por líderes da indústria
            </h3>
            <p className="text-gray-600">
              Temos orgulho de trabalhar com algumas das empresas mais
              respeitadas em vários setores.
            </p>
          </div>

          <div className="relative md:ml-28 md:mr-28 overflow-hidden">
            <div className="flex animate-marquee">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-[150px] mx-4">
                  {" "}
                  {/* Ajuste a largura e o espaçamento */}
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`Client logo ${index + 1}`}
                    width={200} // Ajuste a largura
                    height={125} // Ajuste a altura
                    className="h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio">
        <ServicePortfolio />
      </section>

      {/* sessao contato */}
      <section id="contact" ref={contactRef}>
        <div className="container bg-black mx-auto px-4">
          {/* Seção de título */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-8 md:mb-16"
          >
            <div className="">
              <h2 className="text-3xl md:text-4xl font-bold pt-6 mb-2 text-white">
                Contato
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>
              <p className="text-lg text-gray-200">
                Está pronto para começar seu projeto? Entre em contato com nossa
                equipe para assistência especializada.
              </p>
            </div>
          </motion.div>

          {/* Grid de conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mx-4 md:mx-24"
          >
            {/* Coluna de informações de contato */}
            <div className="bg-white p-6 md:p-8 mb-8 md:mb-11 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-black text-center md:text-left">
                Contato
              </h3>
              <p className="text-gray-600 mb-8 text-center md:text-left">
                Nossa equipe está pronta para responder às suas perguntas e
                fornecer informações de que necessita para tomar decisões
                informadas sobre o seu projeto.
              </p>

              <div className="space-y-6">
                {/* Telefone */}
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-yellow-400 mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-black">Telefone</h4>
                    <p className="text-gray-600">(18) 3329-1918</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-yellow-400 mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-black">Email</h4>
                    <p className="text-gray-600">
                      SOCIETARIO@SECULO20ASSIS.COM.BR
                    </p>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-yellow-400 mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-black">Endereço</h4>
                    <p className="text-gray-600">
                      Av. Tarumã, 236
                      <br />
                      Centro
                      <br />
                      Taruma-Sp
                    </p>
                  </div>
                </div>
              </div>

              {/* Horário comercial */}
              <div className="mt-8">
                <h4 className="font-bold mb-4 text-black text-center md:text-left">
                  Horário comercial
                </h4>
                <p className="text-gray-600 text-center md:text-left">
                  Segunda a Sexta: 07:00 - 17:00
                  <br />
                  Sábado: Fechado
                  <br />
                  Domingo: Fechado
                </p>
              </div>
            </div>

            {/* Coluna do formulário */}
            <div className="bg-white mb-8 md:mb-11 p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-black text-center md:text-left">
                Envie-nos uma mensagem
              </h3>
              <form className="space-y-6">
                {/* Nome e Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nome
                    </label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Seu email"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Celular */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Celular
                  </label>
                  <Input
                    id="phone"
                    placeholder="Seu número de celular"
                    className="w-full"
                  />
                </div>

                {/* Assunto */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700"
                  >
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    placeholder="Assunto da mensagem"
                    className="w-full"
                  />
                </div>

                {/* Mensagem */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Sua mensagem"
                    rows={5}
                    className="w-full"
                  />
                </div>

                {/* Botão de enviar */}
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  Enviar mensagem
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-yellow-400 text-white shadow-lg z-50 hover:bg-primary/90 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

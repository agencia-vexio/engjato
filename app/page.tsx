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
    "/clientes/Alcoeste.webp",
    "/clientes/Alltech.webp",
    "/clientes/enersugar.png",
    "/clientes/granelli.png",
    "/clientes/oleoplan.png",
    "/clientes/olfar.png",
    "/clientes/selecta.png",
    "/clientes/tereos.avif",
    "/clientes/uisa.wepb",
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
                    width={150} // Ajuste a largura
                    height={75} // Ajuste a altura
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
      <section id="contact" className="py-20" ref={contactRef}>
        <div className="container bg-black mx-auto px-4">
          {/* Seção de título */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
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
            className="grid md:grid-cols-2 gap-12 ml-24 mr-24"
          >
            {/* Coluna de informações de contato */}
            <div className="bg-white p-8 mb-11 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-black">Contato</h3>
              <p className="text-gray-600 mb-8">
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
                <h4 className="font-bold mb-4 text-black">Horário comercial</h4>
                <p className="text-gray-600">
                  Segunda a Sexta: 07:00 - 17:00
                  <br />
                  Sábado: Fechado
                  <br />
                  Domingo: Fechado
                </p>
              </div>
            </div>

            {/* Coluna do formulário */}
            <div className="bg-white mb-11 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-black">
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SandBlast Pro</h3>
              <p className="text-gray-400 mb-6">
                Professional industrial sandblasting and surface preparation
                services for all your needs.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="space-y-4">
                <Input
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SandBlast Pro. All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

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

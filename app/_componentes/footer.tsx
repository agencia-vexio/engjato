"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white py-12 overflow-hidden">
      {/* Fundo com imagem e opacidade */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: "url('/jat.jpg')" }}
      ></div>

      {/* Conteúdo do rodapé */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Seção superior: Logo, descrição e links rápidos */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo e descrição */}
          <div className="mb-8 md:ml-28 md:mb-0 text-center md:text-left">
            <Image
              src="/logo2.png"
              alt="logo engjato soluçoes industriais"
              width={140}
              height={90}
              className="mx-auto md:mx-0"
            />
            <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-md mx-auto md:mx-0">
              Soluções Inovadoras em Preparação e Acabamento de Superfícies, Com
              Desempenho Imbatível para Todas as Suas Necessidades Industriais!
            </p>
          </div>

          {/* Links rápidos */}
          <div className="flex justify-center md:justify-between gap-4 sm:gap-8 w-full md:w-auto">
            <div className="text-center md:text-left">
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                Links Rápidos
              </h4>
              <ul className="space-y-2 flex mr-1 justify-center flex-row items-center gap-10 md:mr-28">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Inicio
                  </Link>
                  <span className="ml-2">|</span>
                  <Link
                    href="#about"
                    className="text-gray-400 ml-2 hover:text-yellow-400 transition-colors"
                  >
                    Sobre
                  </Link>
                  <span className="ml-2">|</span>
                  <Link
                    href="#services"
                    className="text-gray-400 ml-2 hover:text-yellow-400 transition-colors"
                  >
                    Serviços
                  </Link>
                  <span className="ml-2">|</span>
                  <Link
                    href="#portfolio"
                    className="text-gray-400 ml-2 hover:text-yellow-400 transition-colors"
                  >
                    Portfolio
                  </Link>
                  <span className="ml-2">|</span>
                  <Link
                    href="#contact"
                    className="text-gray-400 ml-2 hover:text-yellow-400 transition-colors"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção inferior: Direitos autorais e créditos */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:ml-28 md:mr-28 md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ENGJATO | Todos os direitos
            reservados.
          </p>
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 text-sm">Desenvolvido com ❤️ por </span>
            <Link href="http://agenciagrowmedia.com.br/" target="_blank">
              <Image
                src="/logo-grow.png"
                alt="logo agencia grow media"
                width={170}
                height={120}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-black text-white py-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5" // Ajuste a opacidade aqui
          style={{ backgroundImage: "url('/jat.jpg')" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:ml-28 md:mb-0">
              <Image
                src="/logo2.png"
                alt="logo engjato soluçoes industriais"
                width={140}
                height={90}
              />
              <p className="mt-4 text-gray-400 max-w-md">
                Soluções Inovadoras em Preparação e Acabamento de Superfícies,
                Com Desempenho Imbatível para Todas as Suas Necessidades
                Industriais!
              </p>
            </div>

            <div className="flex justify-between gap-8">
              <div className="">
                <h4 className="text-lg font-medium mb-4">Links Rápidos</h4>
                <ul className="space-y-2 flex justify-center flex-row items-center gap-10 md:mr-28">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      Inicio
                    </Link>
                    <Link
                      href="#about"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      Sobre
                    </Link>
                    <Link
                      href="#services"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      Serviços
                    </Link>
                    <Link
                      href="#portfolio"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      Portfolio
                    </Link>
                    <Link
                      href="#contact"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:ml-28 md:mr-28 md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ENGJATO | Todos os direitos
              reservados.
            </p>
            <div className="">
                <span>Desenvolvido por</span>
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
    </>
  );
}

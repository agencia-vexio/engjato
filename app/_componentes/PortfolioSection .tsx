"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Dados do portfólio
const portfolioItems = [
  {
    id: 1,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img2.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img3.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 5,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img4.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 6,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img5.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 7,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img6.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 8,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img7.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 9,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img8.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
  {
    id: 10,
    title: "Lorem Ipsum",
    imageUrl: "/portifolio/img9.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    company: "Empresa ABC - São Paulo/SP",
    year: "2023",
  },
];

export default function PortfolioSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Corrigido: Removido o bloco vazio que envolvia a função
  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % portfolioItems.length);
  };

  const goToPrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(
      (selectedImage - 1 + portfolioItems.length) % portfolioItems.length
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrevious();
  };

  return (
    <motion.section className="py-16 bg-yellow-400">
      <div className="container mx-auto px-4">
        <motion.h2 className="text-3xl md:text-4xl mt-12 font-bold text-center mb-12">
          Nosso Portifólio
          <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:ml-24 md:mr-24">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Corrigido */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-md"
              onClick={closeLightbox}
            />

            <motion.div
              className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* Parte da Imagem */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-black flex items-center justify-center p-4">
                <Image
                  src={portfolioItems[selectedImage].imageUrl}
                  alt={portfolioItems[selectedImage].title}
                  width={800}
                  height={600}
                  className="object-contain max-h-[60vh]"
                />
              </div>

              {/* Parte das Informações (agora visível também em mobile) */}
              <div className="w-full md:w-1/2 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {portfolioItems[selectedImage].title}
                </h2>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    Descrição
                  </h3>
                  <p className="text-gray-600">
                    {portfolioItems[selectedImage].description}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    Cliente
                  </h3>
                  <p className="text-gray-600">
                    {portfolioItems[selectedImage].company}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  Realizado em: {portfolioItems[selectedImage].year}
                </div>
              </div>

              {/* Botões */}
              <button
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-colors"
                onClick={closeLightbox}
              >
                <X size={20} />
              </button>

              <button
                className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-colors"
                onClick={goToPrevious}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-colors md:right-[calc(50%+2px)]"
                onClick={goToNext}
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

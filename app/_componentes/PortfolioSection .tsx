"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Sample portfolio data - replace with your actual projects
const portfolioItems = [
  {
    id: 1,
    title: "Jateamento Industrial",
    imageUrl: "/imgJato4.png",
  },
  {
    id: 2,
    title: "Pintura",
    imageUrl: "/imgJato2.jpg",
  },
  {
    id: 3,
    title: "Hidrolavagem",
    imageUrl: "/hidro.jpg",
  },
  {
    id: 4,
    title: "Andaimes tubo roll",
    imageUrl: "/tuboRoll.jpg",
  },
  {
    id: 5,
    title: "Pintura industrial",
    imageUrl: "/imgJato.jpg",
  },
  {
    id: 6,
    title: "Montagem andaimes tubo roll",
    imageUrl: "/tuboRoll2.jpg",
  },
]

export default function PortfolioSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % portfolioItems.length)
  }

  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + portfolioItems.length) % portfolioItems.length)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === "ArrowLeft") goToPrevious()
  }

  return (
    <motion.section
      className="py-16 bg-yellow-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Nosso Portifólio
          <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-24 mr-24">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => openLightbox(index)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-md" onClick={closeLightbox} />

            <motion.div
              className="relative z-10 max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={portfolioItems[selectedImage].imageUrl || "/placeholder.svg"}
                  alt={portfolioItems[selectedImage].title}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh] mx-auto"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
                  <h3 className="text-xl font-semibold">{portfolioItems[selectedImage].title}</h3>
                </div>
              </div>

              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                onClick={closeLightbox}
              >
                <X size={24} />
                <span className="sr-only">Close</span>
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                onClick={goToPrevious}
              >
                <ChevronLeft size={24} />
                <span className="sr-only">Previous</span>
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                onClick={goToNext}
              >
                <ChevronRight size={24} />
                <span className="sr-only">Next</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}


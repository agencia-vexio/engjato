"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ number, title, description, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="relative flex flex-col h-full p-6 overflow-hidden rounded-xl bg-black/80 border border-yellow-400"
    >
      <div className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white font-bold">
        {number}
      </div>
      <h3 className="mt-8 mb-3 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-100">{description}</p>
      <motion.div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400/70 to-yellow-500/35"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const services = [
    {
      number: "1",
      title: "Jateamento",
      description:
        "Serviços profissionais de jateamento de areia para preparação de superfícies e restauração de metal, concreto e outros materiais.",
    },
    {
      number: "2",
      title: "Hidrolavagem",
      description:
        "Serviços de limpeza com água de alta pressão para remover sujeira, fuligem e contaminantes de diversas superfícies.",
    },
    {
      number: "3",
      title: "Pintura",
      description:
        "Serviços especializados de pintura para aplicações industriais, garantindo proteção duradoura.",
    },
    {
      number: "4",
      title: "Locação de Andaime",
      description: "Locação e montagem de andaimes tubo roll.",
    },
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Image
          src="/imgJato.jpg"
          alt="jateamento industrial"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/30 via-yellow-400/60 to-yellow-900/20" />
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 container mx-auto px-4"
      >
        <div className="mx-auto max-w-7xl ml-24 mr-24 md:ml-24 md:mr-24 sm:ml-4 sm:mr-4 xs:ml-4 xs:mr-4">
          <motion.div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Serviços
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p className="text-gray-300 max-w-2xl mx-auto">
              Oferecemos serviços industriais de alta qualidade.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                number={service.number}
                title={service.title}
                description={service.description}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-medium rounded-full hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#contact">Solicite um orçamento</Link>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-14 h-12 rounded-full bg-yellow-500/10"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 80 - 40, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
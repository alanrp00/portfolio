"use client";

import { certificates, formalEducation } from "@/data/education";
import { getIcon } from "@/utils/iconMap";
import { motion } from "framer-motion";
import {
  FaCertificate,
  FaGraduationCap
} from "react-icons/fa";

export default function EducationTab() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 bg-[var(--color-bg-page)]">
      <div className="w-full max-w-6xl px-6 md:px-10 flex flex-col gap-24">
        {/* 🎓 Educación oficial */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-12 flex items-center gap-3">
            <FaGraduationCap className="text-[var(--color-accent)] text-2xl" />
            Educación Oficial
          </h2>

          <div className="relative w-full">
            {/* Línea vertical */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-[var(--color-border)]" />

            {/* Tarjetas en timeline */}
            <div className="flex flex-col gap-16 relative">
              {formalEducation.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0
                    ? "md:justify-start md:pr-[55%]"
                    : "md:justify-end md:pl-[55%]"
                    }`}
                >
                  {/* Punto */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[var(--color-accent)] border-4 border-[var(--color-bg-page)] rounded-full shadow-md z-20" />

                  {/* Tarjeta */}
                  <div
                    className={`relative w-full md:w-[45%] bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl shadow-md p-6 transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_20px_var(--color-accent)]`}
                  >
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                      {edu.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mb-1 font-medium">
                      {edu.center}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] italic mb-2">
                      {edu.date}
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 🏅 Certificados y cursos */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-12 flex items-center gap-3">
            <FaCertificate className="text-[var(--color-accent)] text-2xl" />
            Certificados y Cursos
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certificates.map((cert, i) => {

              const Icon = getIcon(cert.icon);

              return (
                <motion.div
                  key={cert.title}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px ${cert.color}`,
                  }}
                  className="relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[var(--color-accent)]"
                >
                  <Icon
                    className="text-4xl mb-3 transition-transform duration-300"
                    style={{ color: cert.color }}
                  />
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-1">
                    {cert.provider}
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-sm italic">
                    {cert.date}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

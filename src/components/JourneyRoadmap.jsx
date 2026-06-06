import React from 'react';
import { motion } from 'framer-motion';

const journeySteps = [
  {
    title: 'Mathematical Foundations',
    description:
      'Learn linear algebra, calculus, probability, and statistics to build the base for AI and ML thinking.',
  },
  {
    title: 'Programming Fundamentals',
    description:
      'Build strong Python, OOP, clean coding, and problem-solving skills before moving into AI tools.',
  },
  {
    title: 'Version Control',
    description:
      'Use Git and GitHub to manage projects, collaborate, and maintain professional development workflows.',
  },
  {
    title: 'Databases',
    description:
      'Understand SQL, relational design, data storage, and the basics of vector storage for AI systems.',
  },
  {
    title: 'Data Analysis',
    description:
      'Learn how to clean, transform, explore, and visualize data using modern analysis libraries.',
  },
  {
    title: 'Machine Learning',
    description:
      'Study supervised and unsupervised models, training workflows, testing, evaluation, and model improvement.',
  },
  {
    title: 'Deep Learning',
    description:
      'Move into neural networks, CNNs, transformers, and the foundations behind modern AI architectures.',
  },
  {
    title: 'MLOps',
    description:
      'Learn deployment, monitoring, versioning, automation, and production pipelines for real-world ML systems.',
  },
  {
    title: 'Generative AI',
    description:
      'Explore LLMs, RAG, AI agents, prompt workflows, and modern AI-powered applications.',
  },
];

function JourneyRoadmap() {
  return (
    <section
      id="roadmap"
      className="
        relative isolate overflow-hidden
        bg-[linear-gradient(135deg,#d8eef3_0%,#eefbff_58%,#c6e3eb_100%)]
        px-6 pb-28 pt-40 text-[#071216]
        md:pt-44
      "
      style={{
        fontFamily:
          "'PP Neue Montreal Text', 'PP Neue Montreal', Arial, sans-serif",
      }}
    >
      {/* subtle premium grid only - corner circles removed */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.2]
          bg-[linear-gradient(rgba(6,71,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,71,184,0.03)_1px,transparent_1px)]
          bg-size-[72px_72px]
        "
        aria-hidden="true"
      />

      {/* soft center glass wash, not corner blobs */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.52),transparent_38%)]
        "
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-24 max-w-5xl text-center"
        >
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.3em] text-[#0647b8]">
            04 / Journey
          </p>

          <h2
            className="
              mx-auto max-w-5xl
              text-[clamp(2.6rem,5.8vw,5.6rem)]
              font-light leading-[0.9]
              tracking-[-0.08em]
              text-[#071216]
            "
            style={{
              fontFamily:
                "'PP Neue Montreal Title', 'PP Neue Montreal', Arial, sans-serif",
            }}
          >
            How to Become an AI/ML Engineer?
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#52666c]">
            A structured roadmap from fundamentals to production-ready AI,
            designed as a premium journey you can follow step by step.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-6xl">
          {/* vertical center line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute left-6 top-0 hidden h-full w-px origin-top
              bg-linear-to-b from-transparent via-[#0647b8]/40 to-transparent
              md:left-1/2 md:block
            "
            aria-hidden="true"
          />

          <div className="grid gap-8">
            {journeySteps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.article
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: 52,
                    x: isLeft ? -26 : 26,
                    filter: 'blur(8px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group relative grid gap-5
                    md:grid-cols-[1fr_72px_1fr] md:items-center
                  "
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className={`
                      ${isLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left'}
                      md:row-start-1
                    `}
                  >
                    <div
                      className="
                        relative overflow-hidden rounded-3xl
                        border border-white/55 bg-white/34
                        p-6 shadow-[0_22px_65px_rgba(15,23,42,0.06)]
                        backdrop-blur-xl
                        transition duration-500
                        group-hover:border-black/20
                        group-hover:bg-white/55
                        group-hover:shadow-[0_28px_80px_rgba(15,23,42,0.1)]
                      "
                    >
                      {/* premium glass shine */}
                      <div
                        className="
                          pointer-events-none absolute inset-y-0 -left-1/2 w-1/2
                          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent)]
                          opacity-0 blur-sm transition duration-700
                          group-hover:left-full group-hover:opacity-100
                        "
                        aria-hidden="true"
                      />

                      <div
                        className="
                          pointer-events-none absolute inset-x-0 top-0 h-px
                          bg-linear-to-r from-transparent via-white/90 to-transparent
                        "
                        aria-hidden="true"
                      />

                      <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.24em] text-[#0647b8]">
                        Stage {String(index + 1).padStart(2, '0')}
                      </span>

                      <h3
                        className="
                          m-0 text-[clamp(1.45rem,2.45vw,2.1rem)]
                          font-light leading-[1.04]
                          tracking-[-0.035em] text-[#071216]
                          transition-transform duration-500
                          group-hover:translate-x-1
                        "
                        style={{
                          fontFamily:
                            "'PP Neue Montreal Text', 'PP Neue Montreal', Arial, sans-serif",
                            fontWeight: 300,
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-4 text-[0.98rem] leading-7 text-[#52666c]
                          transition duration-500
                          group-hover:text-[#071216]
                        "
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center number node */}
                  <div
                    className="
                      absolute left-0 top-6 z-10
                      md:static md:col-start-2 md:row-start-1
                      md:flex md:justify-center
                    "
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="
                        flex h-12 w-12 items-center justify-center rounded-full
                        border border-white/75
                        bg-white/75 text-xs font-black tracking-[0.12em]
                        text-[#0647b8]
                        shadow-[0_0_0_8px_rgba(56,189,248,0.08),0_18px_38px_rgba(15,23,42,0.08)]
                        backdrop-blur-xl
                        transition duration-500
                        group-hover:shadow-[0_0_0_10px_rgba(56,189,248,0.12),0_22px_48px_rgba(15,23,42,0.12)]
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>
                  </div>

                  {/* Connector line */}
                  <div
                    className={`
                      pointer-events-none hidden h-px bg-linear-to-r
                      from-[#0647b8]/35 via-[#38bdf8]/40 to-transparent
                      md:block md:row-start-1
                      ${isLeft ? 'md:col-start-2 md:translate-x-9' : 'md:col-start-2 md:-translate-x-9 md:rotate-180'}
                    `}
                    aria-hidden="true"
                  />
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.75,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/dineshpiyasamara/ai-ml-engineer-roadmap"
            className="
              inline-flex items-center justify-center rounded-full
              bg-white px-7 py-4 text-sm font-extrabold uppercase
              tracking-[0.04em] text-[#0647b8]
              shadow-[0_18px_45px_rgba(15,23,42,0.08)]
              transition duration-300
              hover:-translate-y-1
              hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]
            "
          >
            Explore More
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default JourneyRoadmap;
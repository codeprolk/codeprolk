import React, { useMemo, useRef } from 'react';
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

const networkVariants = {
  one: {
    nodes: [
      [58, 72],
      [138, 42],
      [228, 78],
      [320, 48],
      [420, 92],
      [502, 52],
      [104, 158],
      [214, 172],
      [330, 150],
      [454, 188],
      [148, 258],
      [270, 270],
      [392, 250],
      [506, 292],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [0, 6],
      [1, 6],
      [2, 7],
      [6, 7],
      [7, 8],
      [3, 8],
      [8, 9],
      [4, 9],
      [6, 10],
      [10, 11],
      [7, 11],
      [11, 12],
      [8, 12],
      [12, 13],
      [9, 13],
    ],
  },

  two: {
    nodes: [
      [48, 98],
      [128, 54],
      [226, 86],
      [316, 44],
      [430, 88],
      [514, 134],
      [88, 202],
      [196, 184],
      [304, 214],
      [410, 188],
      [142, 298],
      [258, 282],
      [382, 312],
      [498, 264],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [0, 6],
      [6, 7],
      [1, 7],
      [2, 7],
      [7, 8],
      [3, 8],
      [8, 9],
      [4, 9],
      [5, 9],
      [6, 10],
      [10, 11],
      [7, 11],
      [11, 12],
      [8, 12],
      [12, 13],
      [9, 13],
    ],
  },

  three: {
    nodes: [
      [72, 58],
      [162, 104],
      [258, 64],
      [350, 122],
      [464, 72],
      [108, 188],
      [222, 208],
      [324, 184],
      [436, 220],
      [164, 300],
      [286, 284],
      [408, 314],
      [510, 270],
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [0, 5],
      [5, 6],
      [1, 6],
      [2, 6],
      [6, 7],
      [3, 7],
      [7, 8],
      [4, 8],
      [5, 9],
      [9, 10],
      [6, 10],
      [10, 11],
      [7, 11],
      [11, 12],
      [8, 12],
    ],
  },
};

function createLinePath(start, end) {
  return `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`;
}

function MetabolicNetworkCluster({
  idSuffix,
  className = '',
  variant = 'one',
  delay = 0,
}) {
  const network = useMemo(() => {
    const selected = networkVariants[variant] || networkVariants.one;

    return selected.edges.map(([from, to], index) => {
      const start = selected.nodes[from];
      const end = selected.nodes[to];

      return {
        id: `${from}-${to}-${index}`,
        path: createLinePath(start, end),
        delay: (index * 0.11 + delay).toFixed(2),
      };
    });
  }, [variant, delay]);

  const nodes = networkVariants[variant]?.nodes || networkVariants.one.nodes;

  return (
    <div className={`metabolic-network-cluster ${className}`} aria-hidden="true">
      <svg
        className="metabolic-network-svg"
        viewBox="0 0 560 360"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id={`metalLine-${idSuffix}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.58)" />
            <stop offset="45%" stopColor="rgba(112,124,138,0.78)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.52)" />
          </linearGradient>

          <linearGradient
            id={`metalRay-${idSuffix}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="28%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="52%" stopColor="rgba(255,255,255,1)" />
            <stop offset="74%" stopColor="rgba(203,213,225,0.84)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <filter
            id={`metalGlow-${idSuffix}`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="2.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="metabolic-base-lines">
          {network.map((line) => (
            <path
              key={`base-${line.id}`}
              d={line.path}
              fill="none"
              stroke={`url(#metalLine-${idSuffix})`}
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        <g
          className="metabolic-ray-lines"
          filter={`url(#metalGlow-${idSuffix})`}
        >
          {network.map((line) => (
            <path
              key={`ray-${line.id}`}
              d={line.path}
              fill="none"
              stroke={`url(#metalRay-${idSuffix})`}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="34 230"
              style={{
                animationDelay: `${line.delay}s`,
              }}
            />
          ))}
        </g>

        <g className="metabolic-node-dots">
          {nodes.map(([x, y], index) => (
            <circle
              key={`node-${x}-${y}-${index}`}
              cx={x}
              cy={y}
              r={index % 4 === 0 ? 2.6 : 1.85}
              fill="rgba(255,255,255,0.9)"
              style={{
                animationDelay: `${(index * 0.18 + delay).toFixed(2)}s`,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function JourneyRoadmap() {
  const sectionRef = useRef(null);

  const handleMouseMove = (event) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    section.style.setProperty('--roadmap-cursor-x', `${x * 100}%`);
    section.style.setProperty('--roadmap-cursor-y', `${y * 100}%`);
    section.style.setProperty('--network-shift-x', (x - 0.5).toFixed(3));
    section.style.setProperty('--network-shift-y', (y - 0.5).toFixed(3));
  };

  const resetMouseGlow = () => {
    const section = sectionRef.current;
    if (!section) return;

    section.style.setProperty('--roadmap-cursor-x', '50%');
    section.style.setProperty('--roadmap-cursor-y', '50%');
    section.style.setProperty('--network-shift-x', '0');
    section.style.setProperty('--network-shift-y', '0');
  };

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouseGlow}
      className="
        roadmap-cs-section relative isolate overflow-hidden
        bg-[linear-gradient(135deg,#d8eef3_0%,#eefbff_58%,#c6e3eb_100%)]
        px-4 pb-20 pt-28 text-[#071216]
        sm:px-6 sm:pb-24 sm:pt-36
        md:pb-28 md:pt-44
      "
      style={{
        fontFamily:
          "'PP Neue Montreal Text', 'PP Neue Montreal', Arial, sans-serif",
        '--roadmap-cursor-x': '50%',
        '--roadmap-cursor-y': '50%',
        '--network-shift-x': '0',
        '--network-shift-y': '0',
      }}
    >
      <style>
        {`
          .roadmap-cursor-light {
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            background:
              radial-gradient(
                circle at var(--roadmap-cursor-x) var(--roadmap-cursor-y),
                rgba(255, 255, 255, 0.72) 0%,
                rgba(203, 213, 225, 0.35) 11%,
                rgba(148, 163, 184, 0.14) 24%,
                transparent 46%
              );
            opacity: 0.95;
            mix-blend-mode: screen;
          }

          .metabolic-network-cluster {
            position: absolute;
            z-index: 1;
            pointer-events: none;
            width: min(620px, 50vw);
            height: 410px;
            opacity: 0.94;
            filter:
              drop-shadow(0 0 5px rgba(255, 255, 255, 0.72))
              drop-shadow(0 0 20px rgba(148, 163, 184, 0.36));
            -webkit-mask-image:
              radial-gradient(circle, #000 0%, rgba(0, 0, 0, 0.98) 46%, rgba(0, 0, 0, 0.62) 66%, transparent 84%);
            mask-image:
              radial-gradient(circle, #000 0%, rgba(0, 0, 0, 0.98) 46%, rgba(0, 0, 0, 0.62) 66%, transparent 84%);
            transition:
              transform 0.22s ease,
              opacity 0.25s ease,
              filter 0.25s ease;
          }

          .metabolic-network-svg {
            width: 100%;
            height: 100%;
            display: block;
            overflow: visible;
          }

          .metabolic-base-lines path {
            opacity: 0.94;
          }

          .metabolic-ray-lines path {
            opacity: 0.98;
            animation: metabolicLineRay 3.8s linear infinite;
          }

          .metabolic-node-dots circle {
            transform-box: fill-box;
            transform-origin: center;
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.78));
            animation: metabolicNodePulse 2.8s ease-in-out infinite;
          }

          @keyframes metabolicLineRay {
            from {
              stroke-dashoffset: 260;
            }

            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes metabolicNodePulse {
            0%, 100% {
              opacity: 0.4;
              transform: scale(0.94);
            }

            50% {
              opacity: 1;
              transform: scale(1.14);
            }
          }

          .network-cluster-one {
            top: 6%;
            right: 2%;
            transform:
              translate(
                calc(var(--network-shift-x) * -26px),
                calc(var(--network-shift-y) * -18px)
              )
              rotate(-7deg);
          }

          .network-cluster-two {
            top: 34%;
            left: -6%;
            width: min(700px, 56vw);
            height: 460px;
            transform:
              translate(
                calc(var(--network-shift-x) * 30px),
                calc(var(--network-shift-y) * 22px)
              )
              rotate(6deg);
          }

          .network-cluster-three {
            bottom: 5%;
            right: 3%;
            width: min(640px, 50vw);
            height: 420px;
            transform:
              translate(
                calc(var(--network-shift-x) * -22px),
                calc(var(--network-shift-y) * 28px)
              )
              rotate(4deg);
          }

          .network-cluster-four {
            top: 63%;
            left: 16%;
            width: min(500px, 38vw);
            height: 330px;
            opacity: 0.78;
            transform:
              translate(
                calc(var(--network-shift-x) * 18px),
                calc(var(--network-shift-y) * -16px)
              )
              rotate(-4deg);
          }

          .roadmap-cs-section:hover .metabolic-network-cluster {
            opacity: 1;
            filter:
              drop-shadow(0 0 7px rgba(255, 255, 255, 0.9))
              drop-shadow(0 0 28px rgba(148, 163, 184, 0.46));
          }

          .roadmap-cs-line {
            background:
              linear-gradient(
                180deg,
                transparent,
                rgba(148, 163, 184, 0.78),
                rgba(255, 255, 255, 0.95),
                rgba(148, 163, 184, 0.65),
                transparent
              ) !important;
            box-shadow:
              0 0 14px rgba(255, 255, 255, 0.65),
              0 0 32px rgba(148, 163, 184, 0.24);
          }

          @media (max-width: 768px) {
            .metabolic-network-cluster {
              width: 390px;
              height: 280px;
              opacity: 0.58;
            }

            .network-cluster-one {
              top: 10%;
              right: -25%;
            }

            .network-cluster-two {
              top: 42%;
              left: -32%;
            }

            .network-cluster-three {
              bottom: 7%;
              right: -24%;
            }

            .network-cluster-four {
              display: none;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .metabolic-ray-lines path,
            .metabolic-node-dots circle {
              animation: none !important;
            }

            .metabolic-network-cluster {
              transition: none !important;
            }
          }
        `}
      </style>

      {/* cursor-following silver light */}
      <div className="roadmap-cursor-light" aria-hidden="true" />

      {/* metallic neural-network style clusters with running rays */}
      <MetabolicNetworkCluster
        idSuffix="one"
        className="network-cluster-one"
        variant="one"
        delay={0}
      />

      <MetabolicNetworkCluster
        idSuffix="two"
        className="network-cluster-two"
        variant="two"
        delay={0.45}
      />

      <MetabolicNetworkCluster
        idSuffix="three"
        className="network-cluster-three"
        variant="three"
        delay={0.9}
      />

      <MetabolicNetworkCluster
        idSuffix="four"
        className="network-cluster-four"
        variant="one"
        delay={1.25}
      />

      {/* ultra-soft readability wash */}
      <div
        className="
          pointer-events-none absolute inset-0 z-2
          bg-[linear-gradient(180deg,rgba(216,238,243,0.07)_0%,rgba(238,251,255,0.02)_45%,rgba(198,227,235,0.07)_100%)]
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
          className="mx-auto mb-16 max-w-5xl text-center sm:mb-20 md:mb-24"
        >
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.3em] text-[#0647b8]">
            04 / Journey
          </p>

          <h2
            className="
              mx-auto max-w-4xl
              text-[clamp(2.15rem,4.8vw,4.7rem)]
              font-light leading-[0.94]
              tracking-[-0.075em]
              text-[#071216]
            "
            style={{
              fontFamily:
                "'PP Neue Montreal Title', 'PP Neue Montreal', Arial, sans-serif",
            }}
          >
            How to Become an AI/ML Engineer?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#52666c] sm:mt-7 sm:text-base sm:leading-8">
            A structured roadmap from fundamentals to production-ready AI,
            designed as a premium journey you can follow step by step.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-6xl overflow-hidden">
          {/* vertical center line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="
              roadmap-cs-line
              absolute left-6 top-0 h-full w-px origin-top
              bg-linear-to-b from-transparent via-slate-400/70 to-transparent
              md:left-1/2
            "
            aria-hidden="true"
          />

          {/* always-running metallic shooting light on the roadmap line */}
          <motion.div
            className="
              pointer-events-none absolute left-6 top-0 z-20
              h-28 w-0.5 -translate-x-1/2 rounded-full
              bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.98),rgba(203,213,225,0.88),transparent)]
              shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_28px_rgba(148,163,184,0.65),0_0_48px_rgba(100,116,139,0.3)]
              md:left-1/2
            "
            animate={{
              top: ['-10%', '108%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              repeatDelay: 0.45,
              ease: 'linear',
            }}
            aria-hidden="true"
          />

          <div className="grid gap-6 sm:gap-7 md:gap-8">
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
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group relative grid gap-5 pl-16
                    md:grid-cols-[1fr_72px_1fr] md:items-center md:pl-0
                  "
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className={`
                      ${
                        isLeft
                          ? 'md:col-start-1 md:text-right'
                          : 'md:col-start-3 md:text-left'
                      }
                      md:row-start-1
                    `}
                  >
                    <div
                      className="
                        relative overflow-hidden rounded-3xl
                        border border-white/70 bg-white/42
                        p-5 shadow-[0_22px_65px_rgba(15,23,42,0.06)]
                        backdrop-blur-xl
                        transition duration-500
                        group-hover:border-slate-400/40
                        group-hover:bg-white/62
                        group-hover:shadow-[0_28px_80px_rgba(15,23,42,0.11)]
                        sm:p-6
                      "
                    >
                      {/* metallic glass shine on hover */}
                      <div
                        className="
                          pointer-events-none absolute inset-y-0 -left-1/2 w-1/2
                          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.58),transparent)]
                          opacity-0 blur-sm transition duration-700
                          group-hover:left-full group-hover:opacity-100
                        "
                        aria-hidden="true"
                      />

                      <div
                        className="
                          pointer-events-none absolute inset-x-0 top-0 h-px
                          bg-linear-to-r from-transparent via-white/95 to-transparent
                        "
                        aria-hidden="true"
                      />

                      <span className="mb-4 block text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-[#0647b8]">
                        Stage {String(index + 1).padStart(2, '0')}
                      </span>

                      <h3
                        className="
                          m-0 text-[clamp(1.35rem,2.35vw,2.05rem)]
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
                          mt-4 text-[0.92rem] leading-7 text-[#52666c]
                          transition duration-500
                          group-hover:text-[#071216]
                          sm:text-[0.98rem]
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
                        border border-white/90
                        bg-white/82 text-xs font-black tracking-[0.12em]
                        text-[#0647b8]
                        shadow-[0_0_0_8px_rgba(148,163,184,0.1),0_18px_38px_rgba(15,23,42,0.08)]
                        backdrop-blur-xl
                        transition duration-500
                        group-hover:shadow-[0_0_0_10px_rgba(148,163,184,0.18),0_22px_48px_rgba(15,23,42,0.12)]
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>
                  </div>

                  {/* Connector line */}
                  <div
                    className={`
                      pointer-events-none hidden h-px bg-linear-to-r
                      from-slate-500/45 via-white/70 to-transparent
                      md:block md:row-start-1
                      ${
                        isLeft
                          ? 'md:col-start-2 md:translate-x-9'
                          : 'md:col-start-2 md:-translate-x-9 md:rotate-180'
                      }
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
          className="mt-14 flex justify-center sm:mt-16"
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
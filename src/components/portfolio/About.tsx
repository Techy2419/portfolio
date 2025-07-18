import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { useGSAP, gsapUtils } from '@/hooks/useGSAP';

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const neuralRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: "🎓 Computer Science Student",
      company: "Arizona State University",
      description: "Pursuing my Bachelor's degree in Computer Science with a focus on web development and software engineering."
    },
    {
      title: "🏆 Certified Developer",
      company: "Global Career Accelerator",
      description: "Completed comprehensive training in HTML, CSS, JavaScript, and responsive design principles."
    }
  ];

  // PROFESSIONAL GSAP ANIMATIONS WITH ALL FEATURES
  useGSAP(() => {
    const masterTl = gsap.timeline();

    // 1. ADVANCED SVG NEURAL NETWORK with DrawSVG, MorphSVG, Physics
    if (svgRef.current) {
      const svg = svgRef.current;
      
      // Neural Network Nodes with Physics and Morphing
      const nodes = svg.querySelectorAll('.neural-node');
      nodes.forEach((node, i) => {
        gsap.set(node, { scale: 0, opacity: 0 });
        
        // Staggered entrance with physics
        gsap.to(node, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous morphing and pulsing
        gsap.to(node, {
          attr: { r: "6" },
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });

        // Physics-based floating
        gsap.to(node, {
          physics2D: {
            velocity: 20 + Math.random() * 20,
            angle: Math.random() * 360,
            gravity: 50
          },
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });

        // Magnetic interaction
        gsapUtils.magnetic(node, 0.5);
      });

      // Neural Connections with DrawSVG
      const connections = svg.querySelectorAll('.neural-connection');
      connections.forEach((connection, i) => {
        gsap.set(connection, { drawSVG: "0%" });
        
        gsap.to(connection, {
          drawSVG: "100%",
          duration: 1.5,
          delay: i * 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous data flow animation
        gsap.to(connection, {
          drawSVG: "0% 20%",
          duration: 3,
          repeat: -1,
          ease: "none"
        });
      });

      // Data Particles with MotionPath
      const particles = svg.querySelectorAll('.data-particle');
      particles.forEach((particle, i) => {
        const path = `M${100 + (i % 5) * 200},${100 + Math.floor(i / 5) * 150} Q${300 + Math.random() * 600},${Math.random() * 600} ${100 + ((i + 1) % 5) * 200},${100 + Math.floor((i + 1) / 5) * 150}`;
        
        gsap.to(particle, {
          motionPath: {
            path: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
          },
          duration: 8 + Math.random() * 4,
          repeat: -1,
          ease: "none"
        });

        gsap.fromTo(particle, 
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          }
        );
      });

      // Morphing Background Shapes
      const bgShapes = svg.querySelectorAll('.bg-shape');
      bgShapes.forEach((shape, i) => {
        const morphTargets = [
          "M100,200 Q200,100 300,200 Q400,300 300,400 Q200,500 100,400 Q0,300 100,200",
          "M150,150 Q350,50 450,250 Q550,450 350,550 Q150,650 50,450 Q-50,250 150,150",
          "M200,100 Q400,0 500,300 Q600,600 300,700 Q100,800 0,500 Q-100,200 200,100"
        ];
        
        gsap.to(shape, {
          morphSVG: morphTargets[(i + 1) % morphTargets.length],
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
    }

    // 2. ADVANCED TITLE ANIMATION with SplitText
    if (titleRef.current) {
      const titleSplit = new SplitText(titleRef.current, { type: "chars,words" });
      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "0% 50% -50px"
      });

      gsap.to(titleSplit.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Advanced magnetic effect
      gsapUtils.magnetic(titleRef.current, 1);

      // Shimmer effect
      gsap.fromTo(titleRef.current, 
        { backgroundPosition: "-200% center" },
        {
          backgroundPosition: "200% center",
          duration: 3,
          repeat: -1,
          ease: "none"
        }
      );
    }

    // 3. TEXT CONTENT with advanced reveals
    if (textRef.current) {
      const paragraphs = textRef.current.querySelectorAll('p');
      paragraphs.forEach((p, i) => {
        const textSplit = new SplitText(p, { type: "lines,words" });
        gsap.set(textSplit.lines, {
          opacity: 0,
          y: 50,
          rotationX: -45
        });

        gsap.to(textSplit.lines, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }

    // 4. EXPERIENCE CARDS with 3D effects and physics
    if (experienceRef.current) {
      const cards = experienceRef.current.querySelectorAll('.experience-card');
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          y: 100,
          rotationY: 90,
          transformOrigin: "center center"
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        // Advanced hover interactions
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
            duration: 0.4,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.1)",
            duration: 0.4,
            ease: "power2.out"
          });
        });

        // Magnetic effect
        gsapUtils.magnetic(card, 0.8);

        // Floating animation
        gsap.to(card, {
          y: "10px",
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
    }

    // 5. STATS with counter and physics
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      statCards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          scale: 0,
          rotation: 180
        });

        gsap.to(card, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        // Number counter animation
        const number = card.querySelector('.stat-number');
        if (number) {
          const targetNumber = parseInt(number.textContent?.replace('+', '') || '0');
          gsap.fromTo(number, 
            { textContent: 0 },
            {
              textContent: targetNumber,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              stagger: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Physics hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            physics2D: {
              velocity: 30,
              angle: Math.random() * 360,
              gravity: 100
            },
            duration: 1,
            ease: "power2.out"
          });
        });
      });
    }

    // 6. Parallax scrolling effects
    gsap.to(aboutRef.current, {
      y: "-10%",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // 7. Advanced particle system
    if (neuralRef.current) {
      gsapUtils.createParticles(neuralRef.current, 100);
    }

  }, []);

  return (
    <section 
      ref={aboutRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden"
    >
      {/* Advanced Neural Network Particle System */}
      <div ref={neuralRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Ultra-Advanced Neural Network SVG */}
      <div className="absolute inset-0 opacity-15">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 1200 800" 
          className="absolute"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aboutNeuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            
            <filter id="aboutGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Neural Network Nodes with Advanced Features */}
          {[...Array(25)].map((_, i) => (
            <circle
              key={`node-${i}`}
              className="neural-node"
              cx={100 + (i % 5) * 200}
              cy={100 + Math.floor(i / 5) * 150}
              r="4"
              fill="url(#aboutNeuralGrad)"
              filter="url(#aboutGlow)"
            />
          ))}
          
          {/* Neural Connections with DrawSVG */}
          {[...Array(20)].map((_, i) => (
            <path
              key={`connection-${i}`}
              className="neural-connection"
              d={`M${100 + (i % 4) * 200},${100 + Math.floor(i / 4) * 150} Q${300 + Math.random() * 400},${250 + Math.random() * 300} ${300 + (i % 3) * 200},${250 + Math.floor(i / 3) * 150}`}
              stroke="url(#aboutNeuralGrad)"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          ))}
          
          {/* Data Particles for MotionPath */}
          {[...Array(15)].map((_, i) => (
            <circle
              key={`particle-${i}`}
              className="data-particle"
              cx={100 + (i % 5) * 200}
              cy={100 + Math.floor(i / 5) * 150}
              r="2"
              fill="#8B5CF6"
              opacity="0.8"
            />
          ))}
          
          {/* Morphing Background Shapes */}
          {[...Array(3)].map((_, i) => (
            <path
              key={`bg-shape-${i}`}
              className="bg-shape"
              d="M100,200 Q200,100 300,200 Q400,300 300,400 Q200,500 100,400 Q0,300 100,200"
              fill="url(#aboutNeuralGrad)"
              opacity="0.1"
              transform={`translate(${i * 300}, ${i * 100})`}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Advanced Title with SplitText */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
            style={{
              backgroundImage: 'linear-gradient(90deg, #8B5CF6, #EC4899, #06B6D4, #8B5CF6)',
              backgroundSize: '200% 100%'
            }}
          >
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content with Advanced Animation */}
          <div ref={textRef} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Hello! I'm <span className="text-purple-400 font-semibold">Romil Patel</span>, 
              a passionate Computer Science student at Arizona State University with a deep love for 
              creating innovative web experiences. My journey in technology started with curiosity 
              and has evolved into a dedication to crafting clean, efficient, and user-friendly applications.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm passionate about <span className="text-pink-400 font-semibold">web development</span> 
              and constantly learning modern technologies. I'm always exploring new frameworks and 
              staying up-to-date with the latest industry trends and best practices.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or working on personal projects that challenge my skills and creativity.
            </p>

            {/* Advanced Stats with Physics */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-8">
              {[
                { number: "15+", label: "Projects Completed" },
                { number: "5+", label: "Technologies Learning" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="stat-card text-center bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20"
                >
                  <div className="stat-number text-2xl font-bold text-purple-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Experience Cards with 3D Effects */}
          <div ref={experienceRef} className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card relative group"
              >
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-purple-400 font-semibold mb-3">
                    {exp.company}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 text-2xl opacity-70">
                    {exp.title.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
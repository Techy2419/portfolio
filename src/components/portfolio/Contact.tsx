import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import { useGSAP, gsapUtils } from '@/hooks/useGSAP';

const Contact = () => {
  const contactRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send main contact email
      await emailjs.send(
        'service_b8wcxgn',
        'template_3y8l8dn',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Romil Patel'
        },
        'b-uNk6s2WC-8hJ1WN'
      );

      // Send auto-reply email to client
      await emailjs.send(
        'service_b8wcxgn',
        'template_auto_reply',
        {
          to_name: formData.name,
          to_email: formData.email,
          subject: formData.subject,
          from_name: 'Romil Patel'
        },
        'b-uNk6s2WC-8hJ1WN'
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Techy2419",
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/romil-patel-",
      label: "LinkedIn", 
      color: "hover:text-blue-400"
    },
    {
      icon: Mail,
      href: "mailto:romilpatel2007@gmail.com",
      label: "Email",
      color: "hover:text-red-400"
    }
  ];

  // PROFESSIONAL GSAP ANIMATIONS WITH ALL FEATURES
  useGSAP(() => {
    // 1. ADVANCED SVG BACKGROUND with communication theme
    if (svgRef.current) {
      const svg = svgRef.current;
      
      // Communication waves with DrawSVG
      const waves = svg.querySelectorAll('.comm-wave');
      waves.forEach((wave, i) => {
        gsap.set(wave, { drawSVG: "0%" });
        
        gsap.to(wave, {
          drawSVG: "100%",
          duration: 2 + i * 0.5,
          delay: i * 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
        
        // Continuous wave animation
        gsap.to(wave, {
          drawSVG: "30% 70%",
          duration: 4,
          repeat: -1,
          ease: "sine.inOut"
        });
      });

      // Message bubbles with physics
      const bubbles = svg.querySelectorAll('.message-bubble');
      bubbles.forEach((bubble, i) => {
        gsap.set(bubble, { scale: 0, opacity: 0 });
        
        gsap.to(bubble, {
          scale: 1,
          opacity: 0.7,
          duration: 0.8,
          delay: i * 0.2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        // Floating animation with physics
        gsap.to(bubble, {
          physics2D: {
            velocity: 30 + Math.random() * 20,
            angle: Math.random() * 360,
            gravity: 80
          },
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });

        // Morphing bubble shapes
        gsap.to(bubble, {
          attr: { rx: "25", ry: "20" },
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });

      // Connection lines with MotionPath
      const connections = svg.querySelectorAll('.connection-line');
      connections.forEach((line, i) => {
        const paths = [
          "M100,400 Q300,200 500,400 Q700,600 900,400",
          "M200,300 Q400,100 600,300 Q800,500 1000,300"
        ];
        
        gsap.to(line, {
          motionPath: {
            path: paths[i % paths.length],
            autoRotate: false
          },
          duration: 10 + i * 2,
          repeat: -1,
          ease: "none"
        });
      });
    }

    // 2. ADVANCED TITLE with SplitText
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

      // Magnetic effect and shimmer
      gsapUtils.magnetic(titleRef.current, 1);
      
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

    // 3. FORM ANIMATIONS with advanced interactions
    if (formRef.current) {
      const formContainer = formRef.current;
      gsap.set(formContainer, {
        opacity: 0,
        x: -100,
        rotationY: 20
      });

      gsap.to(formContainer, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formContainer,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Individual form field animations
      const formFields = formContainer.querySelectorAll('input, textarea, button');
      formFields.forEach((field, i) => {
        gsap.set(field, {
          opacity: 0,
          y: 30,
          scale: 0.9
        });

        gsap.to(field, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.5 + i * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formContainer,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        // Advanced hover effects
        field.addEventListener('mouseenter', () => {
          gsap.to(field, {
            scale: 1.02,
            boxShadow: "0 8px 25px rgba(139, 92, 246, 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        field.addEventListener('mouseleave', () => {
          gsap.to(field, {
            scale: 1,
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        // Focus effects
        field.addEventListener('focus', () => {
          gsap.to(field, {
            scale: 1.03,
            rotationZ: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        field.addEventListener('blur', () => {
          gsap.to(field, {
            scale: 1,
            rotationZ: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        // Magnetic effect
        gsapUtils.magnetic(field, 0.5);
      });
    }

    // 4. SOCIAL LINKS with advanced 3D effects
    if (socialRef.current) {
      const socialContainer = socialRef.current;
      gsap.set(socialContainer, {
        opacity: 0,
        x: 100,
        rotationY: -20
      });

      gsap.to(socialContainer, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialContainer,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      const socialLinks = socialContainer.querySelectorAll('.social-link');
      socialLinks.forEach((link, i) => {
        gsap.set(link, {
          opacity: 0,
          scale: 0,
          rotation: 180
        });

        gsap.to(link, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: 0.6 + i * 0.15,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: socialContainer,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        // Advanced hover with physics
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            scale: 1.15,
            rotationY: 15,
            z: 50,
            boxShadow: "0 15px 30px rgba(139, 92, 246, 0.3)",
            duration: 0.4,
            ease: "back.out(1.7)"
          });
          
          // Physics explosion effect
          gsap.to(link, {
            physics2D: {
              velocity: 40,
              angle: Math.random() * 360,
              gravity: 200
            },
            duration: 0.6,
            ease: "power2.out"
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            scale: 1,
            rotationY: 0,
            z: 0,
            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.1)",
            duration: 0.4,
            ease: "power2.out"
          });
        });

        // Continuous floating
        gsap.to(link, {
          y: "10px",
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });

        // Magnetic effect
        gsapUtils.magnetic(link, 1);
      });
    }

    // 5. Parallax effects
    gsap.to(contactRef.current, {
      y: "-8%",
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // 6. Advanced particle system
    if (particlesRef.current) {
      gsapUtils.createParticles(particlesRef.current, 120);
    }

  }, []);

  return (
    <section 
      ref={contactRef}
      id="contact" 
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden"
    >
      {/* Advanced Particle System */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Ultra-Advanced Communication SVG */}
      <div className="absolute inset-0 opacity-10">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 1200 800" 
          className="absolute"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            
            <filter id="contactGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Communication Waves with DrawSVG */}
          {[...Array(6)].map((_, i) => (
            <path
              key={`wave-${i}`}
              className="comm-wave"
              d={`M0,${300 + i * 40} Q${300},${200 + i * 20} ${600},${300 + i * 40} Q${900},${400 + i * 20} 1200,${300 + i * 40}`}
              stroke="url(#contactGradient)"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
            />
          ))}
          
          {/* Message Bubbles with Physics */}
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={`bubble-${i}`}
              className="message-bubble"
              cx={150 + i * 140}
              cy={200 + (i % 3) * 200}
              rx="20"
              ry="15"
              fill="url(#contactGradient)"
              filter="url(#contactGlow)"
            />
          ))}
          
          {/* Connection Lines for MotionPath */}
          {[...Array(3)].map((_, i) => (
            <circle
              key={`connection-${i}`}
              className="connection-line"
              cx="100"
              cy="400"
              r="5"
              fill="url(#contactGradient)"
              opacity="0.6"
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Advanced Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
            style={{
              backgroundImage: 'linear-gradient(90deg, #8B5CF6, #EC4899, #06B6D4, #8B5CF6)',
              backgroundSize: '200% 100%'
            }}
          >
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to start your next project with me? Send me a message or connect with me through social media!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Advanced Contact Form */}
          <div ref={formRef}>
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
                  <p className="text-green-300">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-300">Failed to send message. Please try again or contact me directly.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                />
                
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                />
                
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                />
                
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                />
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Advanced Social Links */}
          <div ref={socialRef} className="space-y-8">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              
              <div className="space-y-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link flex items-center gap-4 text-white ${social.color} transition-all duration-300 group`}
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full transition-transform duration-300">
                      <social.icon className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-lg">
                Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
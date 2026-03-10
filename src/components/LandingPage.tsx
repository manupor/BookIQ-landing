"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Cloud,
  DollarSign,
  Eye,
  FileCheck,
  GitMerge,
  Handshake,
  Heart,
  LineChart,
  Link2,
  Lock,
  MessageSquareQuote,
  Rocket,
  Scale,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  LayoutGrid,
  Workflow,
  Menu,
  AlertCircle,
  Info,
  CreditCard,
  Home,
  Monitor,
  Search,
  Settings,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import GradientOrbs from "./GradientOrbs";
import dynamic from "next/dynamic";
import { Sun, Moon } from "lucide-react";

const LiquidEther = dynamic(() => import("./ui/LiquidEther"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-background" />,
});

/* ─── UI Decorations ─── */
function RotatingBadge() {
  const text = "BOOKIQ • KNOW YOUR NUMBERS • GROW YOUR BUSINESS • ";
  const characters = text.split("");
  return (
    <div className="rotating-badge scale-75 sm:scale-100 text-muted-foreground">
      <div className="rotating-text text-[8px] font-bold tracking-widest">
        {characters.map((char, i) => (
          <span
            key={i}
            style={{
              transform: `rotate(${i * (360 / characters.length)}deg)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 backdrop-blur-md border border-border/10 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/5">
        <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse" />
      </div>
    </div>
  );
}

function SectionIndicator({ number }: { number: string }) {
  return <div className="section-number select-none">{number}</div>;
}

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay
      }}
      className={`absolute pointer-events-none z-0 ${className}`}
    />
  );
}

function ThemeToggle({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/50 backdrop-blur-md border border-border/50 text-foreground/70 hover:text-foreground transition-all hover:scale-110 active:scale-95"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

/* ─── Navbar ─── */
function Navbar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#questions' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-[#00020f]/90 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}>
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group flex-shrink-0">
            <img
              src="/book-iq-logo.png"
              alt="BookIQ"
              className="h-11 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-110"
            />
          </a>

          {/* Centered Pill Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0a0d1a]/80 backdrop-blur-xl border border-white/8 rounded-full px-3 py-2">
            {navLinks.map(({ label, href }, idx) => (
              <a
                key={label}
                href={href}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${idx === 0
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: Theme toggle + CTA */}
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a
              href="#join"
              className="hidden sm:flex aivora-btn py-3.5 px-8"
              style={{ fontSize: '11px', letterSpacing: '0.15em' }}
            >
              <span className="font-black uppercase">Join Now</span>
              <span className="arrow-icon" style={{ width: '2rem', height: '2rem' }}>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <button className="lg:hidden text-white">
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#00020f' }}>
      {/* Hero background image — positioned right, fades left */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Actual photo — anchored to the right */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/bookiq-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }} />
        {/* Strong dark overlay — left side keeps text readable */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(100deg, #00020f 40%, rgba(0,2,15,0.75) 65%, rgba(0,2,15,0.3) 100%)',
        }} />
        {/* Bottom fade to solid background */}
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{
          background: 'linear-gradient(to bottom, transparent, #00020f)',
        }} />
        {/* Subtle noise/grain overlay for depth */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }} />
      </div>


      {/* Main Hero Content */}
      <div className="container mx-auto px-8 lg:px-16 relative z-10 pt-36 pb-0">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          {/* Left: Text */}
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-white leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              Know your
              <br />
              numbers, grow
              <br />
              your <span style={{
                color: '#4a9eff',
                textShadow: '0 0 15px rgba(74, 158, 255, 0.2)'
              }}>business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg leading-relaxed mb-12"
              style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px' }}
            >
              Unlock growth and clarity with tailored bookkeeping solutions. We use automation
              and expert-level financial insights to help you innovate and scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href="#join" className="aivora-btn" style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                padding: '1.1rem 2rem',
                boxShadow: '0 0 20px rgba(74, 158, 255, 0.15), 0 8px 24px rgba(74, 158, 255, 0.1)'
              }}>
                <span className="font-black uppercase">Begin Today With Us</span>
                <span className="arrow-icon" style={{ width: '2.2rem', height: '2.2rem' }}>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Cards */}
      <div className="container mx-auto px-8 lg:px-16 relative z-10 pb-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Smarter insights",
              desc: "Make faster, data-driven decisions powered by real-time financial analysis and multi-source predictions.",
              icon: <Zap className="h-7 w-7" />,
            },
            {
              title: "Integrated solutions",
              desc: "No extra tools or plugins needed. Get built-in, scalable financial intelligence from day one.",
              icon: <LayoutGrid className="h-7 w-7" />,
            },
            {
              title: "End-to-end automation",
              desc: "Eliminate bottlenecks with intelligent workflows that never leave you guessing about your cash flow.",
              icon: <Workflow className="h-7 w-7" />,
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + idx * 0.1 }}
              className="group relative p-8 transition-all duration-500 hover:-translate-y-1 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '1.25rem',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Icon with glow orb background */}
              <div style={{
                width: '56px', height: '56px',
                background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.08), rgba(0,100,200,0.08))',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem',
                color: '#4a9eff',
                boxShadow: '0 0 10px rgba(74, 158, 255, 0.1)'
              }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-3 text-white tracking-tight">{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{feature.desc}</p>
              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                boxShadow: 'inset 0 0 0 1px rgba(74, 158, 255, 0.1)'
              }} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}


/* ─── "Let me ask you something" Questions Section ─── */
function QuestionsSection() {
  const questions = [
    {
      title: "Know Your Numbers?",
      text: "Can you name your monthly net profit, revenue, and business valuation right now without checking?",
      icon: <FileCheck className="h-6 w-6" />,
    },
    {
      title: "Ready for Sale?",
      text: "If a buyer walked in today with a 7-figure offer, are your books clean enough to close the deal?",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "Scale or Stall?",
      text: "Do you have the financial clarity to know exactly when to hire, spend, or pull back to scale properly?",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  return (
    <section id="questions" className="relative py-32 overflow-hidden bg-background">
      <SectionIndicator number="01" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="text-center mb-20">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            Know Your Financial Truth
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-8">
            Let me ask you <span className="gradient-text italic">something...</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Successful entrepreneurs don&apos;t just work in their business; they understand the financial engine driving it. How clear is your view?
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {questions.map((q, i) => (
            <AnimatedSection key={q.title} delay={i * 0.15}>
              <div className="aivora-glass group h-full p-10 hover:border-primary/40 transition-all duration-500">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 text-primary group-hover:scale-110 transition-transform duration-500">
                    {q.icon}
                  </div>
                  <h3 className="mb-4 text-2xl font-black tracking-tighter">{q.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">{q.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <p className="text-sm md:text-base font-bold tracking-tight text-foreground/90 leading-none">
              These questions reveal the foundation of business <span className="text-primary italic">success</span> - or failure.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Pain Points / Quotes ─── */
function PainPointsSection() {
  const quotes = [
    {
      text: "I am spending hours each week putting in the same numbers over and over to make sure my accounts are accurate",
      icon: <MessageSquareQuote className="h-5 w-5" />,
    },
    {
      text: "My books are not ready when I need them. I'm making million-dollar decisions with outdated information.",
      icon: <MessageSquareQuote className="h-5 w-5" />,
    },
    {
      text: "We don't know if we're profitable in real time. Are we actually making money or just staying busy?",
      icon: <MessageSquareQuote className="h-5 w-5" />,
    },
    {
      text: "I have no idea how long our cash will last. It keeps me up at night wondering if we'll make payroll.",
      icon: <MessageSquareQuote className="h-5 w-5" />,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      <SectionIndicator number="02" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            What We Hear From Business Owners
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            Here&apos;s what successful entrepreneurs <span className="gradient-text italic">tell us...</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            When they&apos;re struggling with unclear financials, the weight of the unknown is heavy.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {quotes.map((q, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="aivora-glass group p-8 hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-5 text-primary">
                  <MessageSquareQuote className="h-24 w-24" />
                </div>
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                  {q.icon}
                </div>
                <p className="text-muted-foreground leading-relaxed italic text-lg relative z-10">
                  &ldquo;{q.text}&rdquo;
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mt-20 text-center">
          <p className="text-2xl font-black tracking-tighter text-foreground uppercase italic">
            Which of these hits <span className="text-primary">closest to home</span> for you?
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Why We Built BookIQ ─── */
function WhyBookIQSection() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated + Human-Reviewed",
      text: "Advanced bookkeeping automation combined with expert human review ensures accuracy you can trust for critical decisions.",
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Real-Time Financial Intelligence",
      text: "Live cash flow tracking and business valuation updates give you the insights successful entrepreneurs need to thrive.",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "CPA & CFO Built",
      text: "Designed by certified public accountants and chief financial officers who understand what business owners actually need.",
    },
    {
      icon: <CircleDollarSign className="h-6 w-6" />,
      title: "Transparent Pricing",
      text: "One flat monthly price covers everything - no surprise fees, hourly billing, or complicated contracts to navigate.",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      <SectionIndicator number="03" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            That&apos;s Why We Built BookIQ
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            A virtual CFO platform built for{" "} <br className="hidden lg:block" />
            <span className="gradient-text italic">real business owners</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.12}>
              <div className="aivora-glass group h-full p-10 hover:border-primary/40 transition-all duration-500">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 text-primary group-hover:scale-110 transition-transform duration-500">
                    {f.icon}
                  </div>
                  <h3 className="mb-4 text-2xl font-black tracking-tighter">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">{f.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: <Link2 className="h-7 w-7" />,
      title: "Connect Your Tools",
      text: "We integrate seamlessly with your existing accounting software, bank accounts, and business systems without disruption.",
    },
    {
      num: "02",
      icon: <Sparkles className="h-7 w-7" />,
      title: "Clean & Organize",
      text: "Our expert team cleans up your financials, categorizes transactions properly, and ensures everything meets professional standards.",
    },
    {
      num: "03",
      icon: <Brain className="h-7 w-7" />,
      title: "CFO-Level Insights",
      text: "Receive comprehensive monthly reports with cash flow forecasts, valuations, and strategic recommendations explained clearly.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden bg-background">
      <SectionIndicator number="04" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <AnimatedSection className="text-center mb-20">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            Straightforward Process
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            Getting CFO-level financial clarity <br className="hidden lg:block" /> has never been this{" "}
            <span className="gradient-text italic">straightforward</span>
          </h2>
        </AnimatedSection>

        <div className="relative grid md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.2}>
              <div className="relative text-center group">
                <div className="mx-auto mb-10 relative">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(74, 158, 255, 0.05)] group-hover:scale-110 transition-transform duration-500">
                    {s.icon}
                  </div>
                  <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary text-sm font-black italic text-primary shadow-xl">
                    {s.num}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-black tracking-tighter text-foreground">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">{s.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.7} className="mt-24">
          <div className="aivora-glass mx-auto max-w-2xl p-8 text-center border-primary/20 bg-primary/[0.02]">
            <p className="text-sm font-bold text-foreground/90">
              <span className="text-primary italic mr-2 uppercase tracking-widest">Key Difference:</span>
              All reports are reviewed and validated by real finance professionals, not just generated by software.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Aivora Vertical Tabs Services Section ─── */
function AivoraServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const services = [
    {
      title: "Accurate Monthly Financials",
      desc: "Professional-grade P&L, balance sheets, and cash flow statements you can present to investors, lenders, or buyers with full confidence.",
      icon: <FileCheck className="h-7 w-7" />,
      color: "#4a9eff",
    },
    {
      title: "Cash Flow Forecasts",
      desc: "30-90 day projections with scenario planning to help you make confident decisions about growth, hiring, and spending—before it's too late.",
      icon: <TrendingUp className="h-7 w-7" />,
      color: "#00e5ff",
    },
    {
      title: "Monthly Business Valuation",
      desc: "Track your business value over time and understand the key drivers that impact your potential exit price—updated every single month.",
      icon: <BarChart3 className="h-7 w-7" />,
      color: "#7c3aed",
    },
    {
      title: "Owner Compensation Strategy",
      desc: "Optimize your salary, distributions, and benefits structure for maximum tax efficiency and personal financial health tailored to your business.",
      icon: <DollarSign className="h-7 w-7" />,
      color: "#4a9eff",
    },
    {
      title: "Multi-Entity Support",
      desc: "Handle complex LLC structures, subsidiaries, and multiple business entities with consolidated reporting that gives you the full picture.",
      icon: <GitMerge className="h-7 w-7" />,
      color: "#00e5ff",
    },
    {
      title: "Professional Collaboration",
      desc: "Full coordination with your existing CPA, tax professional, or exit planning advisor—we speak the same language so nothing falls through the cracks.",
      icon: <Handshake className="h-7 w-7" />,
      color: "#7c3aed",
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: '#00020f' }}>
      {/* Header above the tabs */}
      <div className="relative z-10 pt-24 pb-12 px-8 lg:px-16 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#4a9eff' }}>
          What&apos;s Included
        </p>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
          Everything You Need for{" "}
          <span style={{ color: '#4a9eff', textShadow: '0 0 15px rgba(74, 158, 255, 0.2)' }}>
            Financial Clarity
          </span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
          Delivered monthly with expert analysis, strategic planning, and real CFO-level insights.
        </p>
      </div>

      <SectionIndicator number="05" />

      {/* The vertical tab strip — full width */}
      <div
        className="relative flex w-full"
        style={{ minHeight: '520px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {services.map((svc, idx) => {
          const isActive = idx === activeIdx;
          return (
            <motion.div
              key={svc.title}
              onClick={() => setActiveIdx(idx)}
              animate={{ flex: isActive ? 6 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden cursor-pointer"
              style={{
                borderRight: idx < services.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(74, 158, 255, 0.03) 0%, rgba(0,5,20,0.95) 100%)'
                  : 'rgba(0,2,15,0.9)',
              }}
            >
              {/* Collapsed: vertical text label */}
              {!isActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-between py-10 px-3">
                  <div
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '11px',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {svc.title}
                  </div>
                  {/* Small arrow icon at bottom */}
                  <div style={{
                    width: '28px', height: '28px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <ArrowUpRight style={{ width: '12px', height: '12px', color: 'rgba(255,255,255,0.4)' }} />
                  </div>
                </div>
              )}

              {/* Expanded: full content */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute inset-0 flex flex-col justify-between p-10 lg:p-14"
                >
                  {/* Top: title + arrow */}
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-4 leading-tight">
                        {svc.title}
                      </h3>
                      <p className="text-sm lg:text-base leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {svc.desc}
                      </p>
                    </div>
                    {/* Neon green arrow button */}
                    <div
                      style={{
                        width: '48px', height: '48px', flexShrink: 0,
                        background: '#4a9eff',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 10px rgba(74, 158, 255, 0.2)',
                      }}
                    >
                      <ArrowUpRight style={{ width: '20px', height: '20px', color: '#000' }} />
                    </div>
                  </div>

                  {/* Bottom: icon badge */}
                  <div style={{
                    width: '64px', height: '64px',
                    background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.08), rgba(0,100,200,0.05))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: svc.color,
                    boxShadow: `0 0 30px ${svc.color}30`,
                  }}>
                    {svc.icon}
                  </div>

                  {/* Subtle glow top border */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${svc.color}80, transparent)`,
                  }} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom nav arrows (Aivora style) */}
      <div className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-6">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {String(activeIdx + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
            disabled={activeIdx === 0}
            style={{
              width: '42px', height: '42px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: activeIdx === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
              cursor: activeIdx === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <ArrowRight style={{ width: '16px', height: '16px', transform: 'rotate(180deg)' }} />
          </button>
          <button
            onClick={() => setActiveIdx(i => Math.min(services.length - 1, i + 1))}
            disabled={activeIdx === services.length - 1}
            style={{
              width: '42px', height: '42px',
              background: activeIdx === services.length - 1 ? 'rgba(255,255,255,0.03)' : '#4a9eff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: activeIdx === services.length - 1 ? 'rgba(255,255,255,0.2)' : '#000',
              cursor: activeIdx === services.length - 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeIdx === services.length - 1 ? 'none' : '0 0 8px rgba(74, 158, 255, 0.15)',
            }}
          >
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── What You Really Want ─── */
function WhatYouWantSection() {
  const wants = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Cash Flow Runway",
      text: 'Know exactly how long your business can operate and plan major decisions with confidence. "How long can we go?" becomes an easy answer.',
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Trustworthy P&L",
      text: "Monthly profit and loss statements you can actually trust for strategic planning, investor meetings, and growth decisions.",
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Real-Time Valuation",
      text: "Track your business value in real-time and understand exactly what drives worth in your industry and market.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Answers, Not Questions",
      text: "Replace confusion and uncertainty with clear insights that help you make better decisions faster and with confidence.",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      <SectionIndicator number="06" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            What You Really Want
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            The clarity every <br className="hidden lg:block" />{" "}
            <span className="gradient-text italic">entrepreneur deserves</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-8">
          {wants.map((w, i) => (
            <AnimatedSection key={w.title} delay={i * 0.12}>
              <div className="aivora-glass group h-full p-10 hover:border-primary/40 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 text-primary group-hover:scale-110 transition-transform duration-500">
                  {w.icon}
                </div>
                <h3 className="mb-4 text-2xl font-black tracking-tighter text-foreground">{w.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">{w.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Business Owners Choose Us ─── */
function WhyUsSection() {
  const reasons = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Expert-Built Platform",
      text: "Developed with direct input from CFOs and CPAs who understand the real challenges of business financial management.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Human-Reviewed Monthly",
      text: "Every report is personally reviewed by qualified finance professionals who catch what automated systems miss.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Proven with Scale",
      text: "Trusted by six and seven-figure business owners who demand accuracy, reliability, and strategic insight from their finances.",
    },
  ];

  return (
    <section id="why-us" className="relative py-32 overflow-hidden bg-background">
      <SectionIndicator number="07" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            Why Business Owners Choose Us
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8 text-foreground">
            We&apos;re not software. We&apos;re a <br className="hidden lg:block" />{" "}
            <span className="gradient-text italic">second set of expert eyes</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {reasons.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 0.12}>
              <div className="aivora-glass group h-full p-10 hover:border-primary/40 transition-all duration-500 text-center">
                <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                  {r.icon}
                </div>
                <h3 className="mb-4 text-2xl font-black tracking-tighter text-foreground">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">{r.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Testimonial */}
        <AnimatedSection delay={0.5}>
          <div className="aivora-glass mx-auto max-w-4xl p-12 text-center border-primary/20 bg-primary/[0.02]">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Heart className="h-8 w-8 text-primary shadow-[0_0_10px_rgba(74, 158, 255, 0.15)]" />
            </div>
            <blockquote className="text-2xl sm:text-3xl font-black tracking-tight leading-relaxed text-foreground italic">
              &ldquo;Finally, financial reports I can actually trust to make big decisions. BookIQ gave me the confidence to expand into two new markets.&rdquo;
            </blockquote>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Pricing Section ─── */
function PricingSection() {
  const benefits = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "No Hourly Billing",
      text: "Flat monthly fee means predictable costs and unlimited access to your financial team without watching the clock.",
    },
    {
      icon: <Cloud className="h-5 w-5" />,
      title: "No Hidden Fees",
      text: "Everything included in one price - setup, monthly reports, forecasting, valuation, and ongoing support.",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "No Long Contracts",
      text: "Month-to-month flexibility because we earn your business every month through exceptional service and results.",
    },
  ];

  return (
    <section id="pricing" className="relative py-32 overflow-hidden bg-background">
      <SectionIndicator number="08" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            Simple, Transparent Pricing
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            Tailored <span className="gradient-text italic">Intelligence</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mx-auto max-w-2xl">
            <div className="aivora-glass overflow-hidden border-primary/20 bg-primary/[0.02] p-12 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="inline-flex items-center gap-2 rounded-full px-6 py-2 bg-primary/10 border border-primary/20 text-xs font-black text-primary uppercase tracking-[0.2em] mb-10">
                Everything Included
              </div>

              <div className="mb-12">
                <span className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground uppercase italic">Tailored <br className="sm:hidden" /> Pricing</span>
              </div>

              <div className="space-y-8 mb-12">
                {benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-6 text-left group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                      {b.icon}
                    </div>
                    <div>
                      <p className="text-xl font-black tracking-tight text-foreground">{b.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed opacity-80">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#join" className="aivora-btn w-full justify-center group py-5 shadow-[0_12px_24px_rgba(74, 158, 255, 0.1)]">
                <span className="text-sm font-black uppercase tracking-widest leading-none">Get Started Today</span>
                <span className="arrow-icon">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-24 text-center">
          <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed max-w-3xl mx-auto italic">
            Think about it:{" "}
            <span className="text-foreground">
              What would it be worth to sleep better at night and know your numbers are right?
            </span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative border-t border-border/10 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.04)_0%,transparent_50%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img
              src="/book-iq-logo.png"
              alt="BookIQ"
              className="h-8 w-auto brightness-0 invert opacity-80"
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} BookIQ. Virtual CFO clarity for real business owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Landing Page ─── */
export default function LandingPage() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden noise-overlay bg-background transition-colors duration-300">
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <HeroSection />
        <QuestionsSection />
        <PainPointsSection />
        <WhyBookIQSection />
        <HowItWorksSection />
        <AivoraServicesSection />
        <WhatYouWantSection />
        <WhyUsSection />
        <PricingSection />
        <Footer />
      </div>
    </div>
  );
}

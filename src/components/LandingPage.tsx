"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
import dynamic from "next/dynamic";
import { Sun, Moon } from "lucide-react";

const DarkVeil = dynamic(() => import("./DarkVeil"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-background" />,
});

/* ─── UI Decorations ─── */
function SectionIndicator({ number }: { number: string }) {
  return <div className="section-number select-none">{number}</div>;
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
              src="/Book IQ Logo_long_WHITE.png"
              alt="BookIQ"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </a>

          {/* Centered Pill Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0a0d1a]/80 backdrop-blur-xl border border-white/8 rounded-full px-3 py-2">
            {navLinks.map(({ label, href }, idx) => (
              <a
                key={label}
                href={href}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${idx === 0
                  ? 'bg-foreground/10 text-foreground border border-foreground/15'
                  : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
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
              className="hidden sm:flex aivora-btn"
              style={{ fontSize: '11px', letterSpacing: '0.15em' }}
            >
              <span className="font-black uppercase">Begin Today</span>
              <span className="arrow-icon" style={{ width: '2rem', height: '2rem' }}>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <button className="lg:hidden text-foreground">
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ theme }: { theme: string }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#00020f' }}>
      {/* DarkVeil animated background */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <DarkVeil
          hueShift={200}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(0,2,15,0.6) 30%, rgba(0,2,15,0.75) 100%)',
        }} />
        {/* Bottom fade to solid background */}
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{
          background: 'linear-gradient(to bottom, transparent, #00020f)',
        }} />
      </div>


      {/* Main Hero Content */}
      <div className="container mx-auto px-8 lg:px-16 relative z-20 pt-36 pb-0">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          {/* Left: Text */}
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', color: theme === 'dark' ? '#ffffff' : '#00020f' }}
            >
              Know Your Numbers,
              <br />
              Know Your <span style={{
                color: '#38485c',
                textShadow: '0 0 15px rgba(56, 72, 92, 0.2)'
              }}>Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg leading-relaxed mb-12"
              style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '620px' }}
            >
              Unlock your companies growth potential with an AI-powered CFO that gives you real-time financial insight—not just historical reports. Make smarter decisions, uncover opportunities faster, and scale your business with accurate, forward-looking data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href="#join" className="aivora-btn" style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                boxShadow: '0 0 20px rgba(56, 72, 92, 0.15), 0 8px 24px rgba(56, 72, 92, 0.1)'
              }}>
                <span className="font-black uppercase">Begin Today</span>
                <span className="arrow-icon" style={{ width: '2.2rem', height: '2.2rem' }}>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative z-30"
            style={{ maxWidth: '1100px' }}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow effect behind laptop */}
              <div className="absolute inset-0 blur-3xl opacity-30" style={{
                background: 'radial-gradient(circle, rgba(56, 72, 92, 0.4) 0%, transparent 70%)',
                transform: 'scale(1.4)',
              }} />
              
              {/* Laptop image */}
              <img
                src="/Laptop-BOOKIQ-Mockup.png"
                alt="BookIQ Dashboard"
                className="relative z-10 w-full h-auto drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(56, 72, 92, 0.3))',
                  transform: 'scale(1.45)',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Feature Cards */}
      <div className="container mx-auto px-8 lg:px-16 relative z-10 pb-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              desc: "Eliminate bottlenecks with intelligent workflows that never leave you guessing about your businesses financials.",
              icon: <Workflow className="h-7 w-7" />,
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="aivora-glass group p-6 hover:border-primary/40 transition-all duration-500"
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
                background: 'linear-gradient(135deg, rgba(56, 72, 92, 0.08), rgba(0,100,200,0.08))',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem',
                color: '#38485c',
                boxShadow: '0 0 10px rgba(56, 72, 92, 0.1)'
              }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-3 tracking-tight" style={{ color: theme === 'dark' ? '#ffffff' : '#00020f' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,2,15,0.65)' }}>{feature.desc}</p>
              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                boxShadow: 'inset 0 0 0 1px rgba(56, 72, 92, 0.1)'
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
      text: "Can you name your monthly net profit, revenue, and business valuation right now without having to review your financials?",
      icon: <FileCheck className="h-6 w-6" />,
    },
    {
      title: "Is Your Company Exit-Ready?",
      text: "If a buyer walked in today with an offer, are your books clean enough to close the deal?",
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

        <div className="grid md:grid-cols-3 gap-6">
          {questions.map((q, i) => (
            <AnimatedSection key={q.title} delay={i * 0.15}>
              <div className="aivora-glass group h-full p-6 hover:border-primary/40 transition-all duration-500">
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
          <div className="max-w-4xl mx-auto px-8 py-6">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground leading-relaxed">
              These questions reveal the foundation of a businesses <span className="text-primary italic">success</span> - or failure.
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
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            What We Hear From Business Owners
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            Here&apos;s what successful entrepreneurs and business owners <span className="gradient-text italic">tell us...</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            When you are struggling with unclear financials, the weight of the unknown is heavy.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {quotes.map((q, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="aivora-glass group p-6 hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
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
      icon: <LineChart className="h-6 w-6" />,
      title: "Real-Time Financial Intelligence",
      text: "Live cash flow tracking and future cashflow projections give you the insights successful entrepreneurs and business owners need to thrive.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated + Human-Reviewed",
      text: "Advanced bookkeeping automation combined with expert human review ensures accuracy you can trust for critical decisions.",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "CPA & CFO Built",
      text: "Designed by certified public accountants and chief financial officers who understand what business owners actually need.",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
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

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.12}>
              <div className="aivora-glass group h-full p-6 hover:border-primary/40 transition-all duration-500">
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
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(56, 72, 92, 0.05)] group-hover:scale-110 transition-transform duration-500">
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
          <div className="aivora-glass mx-auto max-w-3xl p-8 text-center border-primary/20 bg-primary/[0.02]">
            <p className="text-base md:text-lg font-bold text-foreground/90 leading-relaxed">
              <span className="text-primary italic mr-2 uppercase tracking-widest">Key Difference:</span>
              All reports and data are reviewed and validated by real finance professionals, not just generated by software. This Hybrid approach, allows you to trust in the financial clarity you receive.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Aivora Vertical Tabs Services Section (Mockup Style) ─── */
function AivoraServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const services = [
    {
      title: "Accurate Monthly Financials",
      desc: "Professional-grade P&L, balance sheets, and cash flow statements you can trust to present to investors, lenders, business associates or buyers with full confidence.",
      icon: <FileCheck className="h-7 w-7" />,
      color: "#38485c",
    },
    {
      title: "Workflow Management",
      desc: "Accurate financial tracking with real-time financial intelligence that tracks what you earn, what you owe, and the actions needed to keep your business financially strong.",
      icon: <Workflow className="h-7 w-7" />,
      color: "#00e5ff",
    },
    {
      title: "Cash Flow Forecasts",
      desc: "30-90 day projections with scenario planning to help you make financially informed, confident decisions about growth, hiring, and spending—before it's too late.",
      icon: <TrendingUp className="h-7 w-7" />,
      color: "#7c3aed",
    },
    {
      title: "Multi-Entity Support",
      desc: "Handle complex LLC structures, subsidiaries, and multiple business entities with consolidated reporting that gives you the full picture.",
      icon: <GitMerge className="h-7 w-7" />,
      color: "#38485c",
    },
    {
      title: "Monthly Q-Score - Business Valuation Health Rating",
      desc: "Track your businesses overall wellness and value, over time, and understand the key drivers that impact your potential exit price or overall business valuation.",
      icon: <BarChart3 className="h-7 w-7" />,
      color: "#00e5ff",
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: '#00020f' }}>
      {/* Header above the tabs */}
      <div className="relative z-10 pt-24 pb-12 px-8 lg:px-16 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#38485c' }}>
          What&apos;s Included
        </p>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4" style={{ color: '#ffffff' }}>
          Everything You Need for{" "}
          <span style={{ color: '#38485c', textShadow: '0 0 15px rgba(56, 72, 92, 0.2)' }}>
            Financial Clarity
          </span>
        </h2>
        <p className="max-w-3xl mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Delivered monthly with expert analysis, strategic planning, and real CFO-level insights.
        </p>
      </div>

      {/* Vertical boxes layout - Mockup style */}
      <div className="relative z-10 px-8 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left side: Vertical boxes with rotated text */}
          <div className="flex flex-col lg:flex-row gap-0 h-[500px]">
            {services.map((svc, idx) => (
              <motion.div
                key={svc.title}
                onMouseEnter={() => setActiveIdx(idx)}
                className="relative cursor-pointer transition-all duration-300 flex-1"
                style={{
                  background: idx === activeIdx 
                    ? 'rgba(20, 25, 40, 0.8)'
                    : 'rgba(10, 15, 30, 0.6)',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
                whileHover={{ background: 'rgba(20, 25, 40, 0.9)' }}
              >
                {/* Vertical rotated text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      color: idx === activeIdx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      fontSize: '10px',
                      fontWeight: 900,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.3s',
                    }}
                  >
                    {svc.title}
                  </div>
                </div>
                
                {/* Number indicator at bottom */}
                <div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: idx === activeIdx ? 'rgba(56, 72, 92, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${idx === activeIdx ? 'rgba(56, 72, 92, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 900,
                    color: idx === activeIdx ? '#38485c' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {idx + 1}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side: Content area */}
          <div className="relative bg-gradient-to-br from-[#0a0f1e] to-[#050812] border border-white/5 p-8 lg:p-12 flex flex-col justify-center">
            <AnimatedSection>
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl lg:text-3xl font-black tracking-tight mb-6 leading-tight" style={{ color: '#ffffff' }}>
                  {services[activeIdx].title}
                </h3>
                <p className="text-sm lg:text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {services[activeIdx].desc}
                </p>
                
                {/* Icon badge */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, rgba(56, 72, 92, 0.1), rgba(0,100,200,0.05))',
                  border: '1px solid rgba(56, 72, 92, 0.2)',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: services[activeIdx].color,
                  boxShadow: `0 0 20px ${services[activeIdx].color}20`,
                }}>
                  {services[activeIdx].icon}
                </div>

                {/* Arrow button */}
                <div className="mt-8">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: '#38485c',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 20px rgba(56, 72, 92, 0.3)',
                    }}
                  >
                    <ArrowUpRight style={{ width: '20px', height: '20px', color: '#000' }} />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
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
              background: activeIdx === services.length - 1 ? 'rgba(255,255,255,0.03)' : '#38485c',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: activeIdx === services.length - 1 ? 'rgba(255,255,255,0.2)' : '#000',
              cursor: activeIdx === services.length - 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeIdx === services.length - 1 ? 'none' : '0 0 8px rgba(56, 72, 92, 0.15)',
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
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [cardIndex, setCardIndex] = React.useState(0);

  const wants = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Cash Flow Runway",
      text: 'Know exactly how long your business can operate and plan major decisions with confidence. The Answer to "How long can we go?" "How much runway do we have? becomes a stress free answer.',
    },
    {
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: "Trustworthy P&L",
      text: "Monthly Accurate profit and loss statements you can actually trust for strategic planning, investor meetings, and growth decisions.",
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Real-Time Business Health",
      text: "Track your business value and overall health, in real-time, and understand exactly what drives worth in your company, your industry, and your market.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Answers, Not Questions!",
      text: "Replace confusion and uncertainty with clear insights that help you make better financially informed decisions sooner, with confidence, to match the pace of your industry.",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newCardIndex = Math.min(
        Math.floor(latest * wants.length),
        wants.length - 1
      );
      setCardIndex(newCardIndex);
    });
  }, [scrollYProgress, wants.length]);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-background"
      style={{ height: '400vh' }}
    >
      <div 
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        {/* Header */}
        <div className="text-center mb-12 flex-shrink-0">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 italic">
            What You Really Want
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            The clarity every <br className="hidden lg:block" />{" "}
            <span className="gradient-text italic">Business Owner deserves</span>
          </h2>
        </div>

        {/* Cards - all stacked at same position, one visible at a time */}
        <div className="relative w-full max-w-3xl flex-shrink-0" style={{ height: '320px' }}>
          {wants.map((w, i) => (
            <motion.div
              key={w.title}
              className="absolute inset-0"
              animate={{ 
                y: i < cardIndex ? -80 : i === cardIndex ? 0 : 80,
                opacity: i === cardIndex ? 1 : i < cardIndex ? 0 : 0,
                scale: i === cardIndex ? 1 : 0.96,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: i === cardIndex ? 10 : 0 }}
            >
              <div 
                className="h-full p-10 lg:p-12"
                style={{
                  background: 'rgba(0, 2, 15, 0.98)',
                  border: '1px solid rgba(56, 72, 92, 0.3)',
                  borderRadius: '2rem',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 72, 92, 0.1)',
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mb-6 border border-primary/30 text-primary">
                  {w.icon}
                </div>
                <h3 className="mb-3 text-3xl font-black tracking-tighter text-foreground">{w.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base opacity-90">{w.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex gap-3 mt-10 flex-shrink-0">
          {wants.map((_, i) => (
            <div 
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === cardIndex ? '24px' : '10px',
                height: '10px',
                background: i === cardIndex ? 'var(--primary)' : 'rgba(74,158,255,0.25)',
              }}
            />
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
      title: "AI Powered. Expert Reviewed",
      text: "Every report is personally reviewed by qualified finance professionals who catch what automated systems can miss.",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Proven with Scale",
      text: "Trusted by six and seven-figure business owners who demand accuracy, reliability, and strategic insight from their finances.",
    },
  ];

  return (
    <section id="why-us" className="relative py-32 overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            Why Business Owners Choose Us
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8 text-foreground">
            Because smart financial decisions require more than just software, <br className="hidden lg:block" />{" "}
            <span className="gradient-text italic">they require a financial partner you can trust.</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {reasons.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 0.12}>
              <div className="aivora-glass group h-full p-6 hover:border-primary/40 transition-all duration-500 text-center">
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
          <div className="aivora-glass mx-auto max-w-3xl p-8 text-center border-primary/20 bg-primary/[0.02]">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Heart className="h-8 w-8 text-primary shadow-[0_0_10px_rgba(56, 72, 92, 0.15)]" />
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
      title: "No Long Term Contracts",
      text: "12 Month Contract, then month-to-month. because We earn your business every month through exceptional service and financially driven results.",
    },
  ];

  return (
    <section id="pricing" className="relative py-32 overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 italic">
            Simple Effortless, Transparent Pricing
          </p>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            Tailored <span className="gradient-text italic">Intelligence</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mx-auto max-w-2xl">
            <div className="aivora-glass overflow-hidden border-primary/20 bg-primary/[0.02] p-8 text-center relative">
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

              <a href="#join" className="aivora-btn w-full justify-center group py-2 px-4">
                <span className="text-sm font-black uppercase tracking-widest leading-none">Begin Today</span>
                <span className="arrow-icon">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-24 text-center">
          <div className="max-w-full mx-auto px-6">
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground leading-relaxed">
              Imagine sleeping better at night knowing your financials are accurate and your decisions are backed by real time data.
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-primary leading-relaxed mt-4">
              What is financial peace of mind worth to you?
            </p>
          </div>
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
              src="/Book IQ Logo_long_WHITE.png"
              alt="BookIQ"
              className="h-10 w-auto opacity-80"
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} BookIQ. Know your numbers. Know your business.
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
    <div className="noise-overlay bg-background transition-colors duration-300">
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <HeroSection theme={theme} />
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

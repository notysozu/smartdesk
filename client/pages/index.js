import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faBook, faCheck, faHome, faBookOpen, faMoneyBillWave, faBuilding, faCalendarAlt, faChartBar, faHeart, faRocket, faShieldAlt, faUsers, faCogs, faGlobe, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>SmartDesk - AI-Powered University Management System</title>
        <meta name="description" content="Transform your university operations with SmartDesk - Comprehensive management system with 200+ features" />
      </Head>
      <div className="min-h-screen bg-background relative selection:bg-brand/30 selection:text-white">

        {/* Navbar */}
        <nav className="relative z-10 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-border/40">
          <div className="text-xl font-bold tracking-tight text-primary">SmartDesk</div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link href="#features" className="text-secondary hover:text-primary transition-colors">Features</Link>
            <Link href="#about" className="text-secondary hover:text-primary transition-colors">About</Link>
            <Link href="#contact" className="text-secondary hover:text-primary transition-colors">Contact</Link>
            <Link href="/api-docs" className="text-secondary hover:text-primary transition-colors">API Docs</Link>
          </div>
          <div>
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-background bg-slate-100 hover:bg-white transition-all shadow-sm"
            >
              Sign In
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 w-full pt-32 pb-20 text-center px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-border bg-surface-muted text-xs font-semibold text-brand">
              <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse"></span>
              Introducing SmartDesk 2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary tracking-tight leading-tight">
              Next-Generation <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">University Management</span>
            </h1>
            
            <p className="text-lg md:text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              A comprehensive platform with 200+ features for academic excellence. Manage everything from student enrollment to financial operations with powerful AI-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push("/login")}
                className="btn-neon-primary px-8 py-3 rounded-full text-sm font-medium shadow-glass-sm"
              >
                Start Operating <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
              <button
                onClick={() => router.push("/api-docs")}
                className="px-8 py-3 rounded-full text-sm font-medium border border-border text-primary hover:bg-surface transition-all"
              >
                Explore the API
              </button>
            </div>
          </div>
        </section>

        {/* Trust & Metrics Row */}
        <section className="relative z-10 border-y border-border/40 bg-surface/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/40">
              {[
                { value: "200+", label: "Platform Features" },
                { value: "10k+", label: "Active Students" },
                { value: "50+", label: "Global Universities" },
                { value: "99.9%", label: "Uptime SLA" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center pt-8 md:pt-0">
                  <div className="text-3xl font-bold text-primary mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Bento Box */}
        <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary tracking-tight">
              Powerful functionality, <br /> packaged perfectly.
            </h2>
            <p className="text-secondary text-lg">
              Every tool your institution needs to scale securely, built directly into the core engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Grid Item 1 (Spans 2 cols) */}
            <div className="md:col-span-2 futuristic-card group">
              <div className="mb-4 text-brand bg-brand/10 w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                <FontAwesomeIcon icon={faBrain} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">AI Intelligence Engine</h3>
              <p className="text-secondary max-w-md">Advanced ML models analyze student feedback, detect engagement patterns, and provide actionable forecasting insights for the administration board.</p>
            </div>

            {/* Bento Grid Item 2 */}
            <div className="futuristic-card group">
              <div className="mb-4 text-accent bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Real-time Analytics</h3>
              <p className="text-secondary">Comprehensive reporting tools delivering deep visibility into daily operational metrics.</p>
            </div>

            {/* Bento Grid Item 3 */}
            <div className="futuristic-card group">
              <div className="mb-4 text-success bg-success/10 w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Financial Ops</h3>
              <p className="text-secondary">Automated fee routing, payment gateways, and integrated scholarship tracking.</p>
            </div>

            {/* Bento Grid Item 4 (Spans 2 cols) */}
            <div className="md:col-span-2 futuristic-card group">
              <div className="mb-4 text-brand-strong bg-brand-strong/10 w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Academic Core</h3>
              <p className="text-secondary max-w-md">The heartbeat of instruction. Complete and immutable tracking for course structures, departmental scheduling, and live student enrollment lifecycle management.</p>
            </div>

             {/* Bento Grid Items 5, 6, 7 */}
             <div className="futuristic-card group">
              <div className="mb-4 text-primary bg-surface-strong w-10 h-10 rounded flex items-center justify-center">
                <FontAwesomeIcon icon={faBuilding} />
              </div>
              <h3 className="text-lg font-bold mb-1 text-primary">Infrastructure</h3>
              <p className="text-sm text-secondary">Asset management.</p>
            </div>
            <div className="futuristic-card group">
              <div className="mb-4 text-primary bg-surface-strong w-10 h-10 rounded flex items-center justify-center">
                <FontAwesomeIcon icon={faHome} />
              </div>
              <h3 className="text-lg font-bold mb-1 text-primary">Housing</h3>
              <p className="text-sm text-secondary">Hostel allocations.</p>
            </div>
            <div className="futuristic-card group">
              <div className="mb-4 text-primary bg-surface-strong w-10 h-10 rounded flex items-center justify-center">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
              <h3 className="text-lg font-bold mb-1 text-primary">Library</h3>
              <p className="text-sm text-secondary">Digital indexing.</p>
            </div>
          </div>
        </section>

        {/* Narrative & About Section */}
        <section id="about" className="relative z-10 border-y border-border/40 bg-surface/20">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary tracking-tight">Engineered for higher education.</h2>
              <p className="text-xl text-secondary leading-relaxed mb-12">
                SmartDesk replaces chaotic legacy software with a structured, seamless ecosystem. By securely unifying academic, financial, infrastructure, and administrative domains, we empower educators to focus purely on creating world-class learning experiences.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                {[
                  { icon: faShieldAlt, title: "Secure Data" },
                  { icon: faUsers, title: "Role specific" },
                  { icon: faRocket, title: "Scalable" },
                  { icon: faCogs, title: "Automated" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-surface/50">
                    <FontAwesomeIcon icon={item.icon} className="text-xl text-brand mb-2" />
                    <span className="text-sm font-semibold text-primary">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-4xl mx-auto futuristic-card p-10 md:p-14 border-border">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-primary tracking-tight">Ready to modernize?</h2>
                <p className="text-secondary mb-8">
                  Get in touch with our solutions team to discuss deploying SmartDesk for your institution.
                </p>
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Email</div>
                    <a href="mailto:support@smartdesk.com" className="text-brand hover:text-brand-strong transition-colors font-medium">
                      support@smartdesk.com
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Developer</div>
                    <div className="text-secondary font-medium"><FontAwesomeIcon icon={faGlobe} className="mr-2 text-muted" /> rynixofficial</div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Work Email</label>
                    <input type="email" className="input-neon w-full rounded-lg" placeholder="hello@university.edu" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Message</label>
                    <textarea className="input-neon w-full rounded-lg min-h-[100px] resize-y" placeholder="Tell us about your needs..."></textarea>
                  </div>
                  <button type="button" className="w-full bg-brand text-white font-medium py-3 rounded-lg hover:bg-brand-strong transition-all shadow-sm">
                    Contact Solutions
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/40 py-12 bg-surface/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-secondary">
            <div>
              <span className="font-bold text-primary mr-2">SmartDesk</span> 
              © 2026. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <a href="https://github.com/rynixofficial" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

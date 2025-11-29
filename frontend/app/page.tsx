import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ShieldCheck, Leaf, BarChart3, Zap, FileText, Activity, ArrowRight, Check, Mail, Twitter, Github } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden scroll-smooth">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-[2000px] left-[-200px] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -z-10" />

            {/* Hero Section */}
            <header className="px-4 lg:px-6 h-20 flex items-center justify-center border-b border-white/5 glass sticky top-0 z-50 transition-all duration-300">
                <div className="container flex items-center justify-between">
                    <Link className="flex items-center justify-center group" href="#">
                        <div className="relative">
                            <ShieldCheck className="h-8 w-8 mr-2 text-primary group-hover:text-accent transition-colors duration-300" />
                            <div className="absolute inset-0 bg-primary/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-bold text-2xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            ORBYTE
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-8">
                        {[
                            { name: "Features", href: "#features" },
                            { name: "Pricing", href: "#pricing" },
                            { name: "About", href: "#about" },
                            { name: "Contact", href: "#contact" }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest hover:neon-text"
                                href={item.href}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <Link href="/login">
                        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary-foreground transition-all duration-300 neon-glow">
                            Login
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center">
                <section className="w-full py-20 md:py-32 lg:py-48 flex flex-col items-center justify-center text-center px-4">
                    <div className="container flex flex-col items-center space-y-8 max-w-4xl">
                        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            Next-Gen Cloud Governance
                        </div>

                        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 neon-text">
                            Automate the <br className="hidden md:block" />
                            <span className="text-primary">Future of Cloud</span>
                        </h1>

                        <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl leading-relaxed">
                            Unify compliance and sustainability with the power of <span className="text-secondary font-semibold">Vertex AI</span>.
                            Orchestrate your environment with precision.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8">
                            <Link href="/app">
                                <Button size="lg" className="h-14 px-8 text-lg bg-primary text-black hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] w-full sm:w-auto">
                                    Launch Console <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-white/20 hover:bg-white/10 w-full sm:w-auto glass">
                                Watch Simulation
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="w-full py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30" />
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <div className="space-y-6 text-left">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                                    <span className="text-red-400">Friction</span> is the Enemy.
                                </h2>
                                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                                    Manual screenshots, endless spreadsheets, and fragmented data are relics of the past.
                                    They lead to high audit costs and hidden carbon emissions.
                                </p>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                                        <div className="p-2 rounded-full bg-red-500/20 text-red-400">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Compliance Drag</h3>
                                            <p className="text-sm text-muted-foreground">Weeks lost to manual evidence collection.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                                        <div className="p-2 rounded-full bg-orange-500/20 text-orange-400">
                                            <Zap className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Hidden Waste</h3>
                                            <p className="text-sm text-muted-foreground">Idle resources bleeding budget and carbon.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="glass-card p-8 rounded-2xl transform hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white">Legacy Audit</h3>
                                        <span className="text-red-400 font-mono">FAILED</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-[30%] bg-red-500/50" />
                                        </div>
                                        <p className="text-xs text-muted-foreground font-mono">Progress: 30% • Est. Completion: 4 Weeks</p>
                                    </div>
                                </div>

                                <div className="glass-card p-8 rounded-2xl border-primary/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] transform translate-x-4 md:translate-x-8 hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-primary">Orbyte Audit</h3>
                                        <span className="text-primary font-mono animate-pulse">ACTIVE</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-[92%] bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                        </div>
                                        <p className="text-xs text-primary font-mono">Progress: 92% • Est. Completion: &lt; 1 Hour</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="w-full py-24 bg-black/40 backdrop-blur-sm">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                                System Capabilities
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Advanced modules designed for the modern cloud era.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { icon: ShieldCheck, title: "Compliance Copilot", desc: "Automated checks for NIST 800-53, SOC 2, and ISO 27001.", color: "text-blue-400" },
                                { icon: Leaf, title: "Sustainability Insights", desc: "Real-time emissions dashboard and idle resource detection.", color: "text-green-400" },
                                { icon: FileText, title: "Auto-Documentation", desc: "AI-generated implementation statements and evidence mapping.", color: "text-orange-400" },
                                { icon: BarChart3, title: "Scenario Simulation", desc: "'What if' analysis to predict impact before execution.", color: "text-purple-400" },
                                { icon: Zap, title: "Action Playbooks", desc: "Guided workflows from detection to remediation.", color: "text-yellow-400" },
                                { icon: Activity, title: "Risk Assessment", desc: "Continuous monitoring of your cloud security posture.", color: "text-red-400" }
                            ].map((feature, i) => (
                                <Card key={i} className="glass-card border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group">
                                    <CardHeader>
                                        <feature.icon className={`h-10 w-10 mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                                        <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="w-full py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-30" />
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                                Simple Pricing
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Start small and scale your governance as you grow.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                            {[
                                { name: "Starter", price: "$0", desc: "For individuals and small prototypes.", features: ["5 Projects", "Basic Compliance Checks", "Community Support"] },
                                { name: "Pro", price: "$499", desc: "For growing teams and startups.", features: ["Unlimited Projects", "Full Compliance Suite", "Vertex AI Insights", "Priority Support"], popular: true },
                                { name: "Enterprise", price: "Custom", desc: "For large organizations.", features: ["Custom Integrations", "Dedicated Account Manager", "SLA Guarantees", "On-premise Deployment"] }
                            ].map((plan, i) => (
                                <Card key={i} className={`glass-card border-white/5 flex flex-col ${plan.popular ? 'border-primary shadow-[0_0_30px_rgba(6,182,212,0.2)] scale-105' : ''}`}>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                        <CardDescription className="text-muted-foreground">{plan.desc}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, j) => (
                                                <li key={j} className="flex items-center text-sm">
                                                    <Check className="h-4 w-4 text-primary mr-2" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className={`w-full ${plan.popular ? 'bg-primary text-black hover:bg-cyan-400' : 'variant-outline border-white/20 hover:bg-white/10'}`}>
                                            Get Started
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="w-full py-24 bg-black/40 backdrop-blur-sm">
                    <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                                Orchestrating the Future
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                We believe that cloud compliance shouldn't be a burden, and sustainability shouldn't be an afterthought.
                                Orbyte was born from the idea that **AI can bridge the gap** between complex regulations and efficient cloud operations.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Our mission is to empower engineering teams to build fast, stay secure, and leave a lighter footprint on the planet.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="relative w-64 h-64 md:w-96 md:h-96">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-[80px] opacity-50 animate-pulse" />
                                <div className="absolute inset-4 glass rounded-full flex items-center justify-center border border-white/10">
                                    <ShieldCheck className="h-32 w-32 text-white/80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="w-full py-24 relative">
                    <div className="container px-4 md:px-6 mx-auto max-w-2xl">
                        <div className="glass-card p-8 md:p-12 rounded-3xl border-white/10 text-center space-y-8">
                            <h2 className="text-3xl font-bold tracking-tighter">Ready to Launch?</h2>
                            <p className="text-muted-foreground">
                                Get in touch with our team to schedule a demo or discuss your enterprise needs.
                            </p>

                            <div className="flex flex-col gap-4">
                                <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white" />
                                <textarea placeholder="How can we help?" rows={4} className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white" />
                                <Button size="lg" className="w-full bg-primary text-black hover:bg-cyan-400 neon-glow">
                                    Send Message
                                </Button>
                            </div>

                            <div className="flex justify-center gap-6 pt-4">
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></Link>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-6 w-6" /></Link>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="h-6 w-6" /></Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="py-8 w-full border-t border-white/10 bg-black/80 backdrop-blur-md">
                <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 mx-auto">
                    <p className="text-xs text-muted-foreground">
                        © 2024 ORBYTE SYSTEM. All rights reserved.
                    </p>
                    <nav className="flex gap-6">
                        <Link className="text-xs text-muted-foreground hover:text-primary transition-colors" href="#">
                            Terms of Service
                        </Link>
                        <Link className="text-xs text-muted-foreground hover:text-primary transition-colors" href="#">
                            Privacy
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

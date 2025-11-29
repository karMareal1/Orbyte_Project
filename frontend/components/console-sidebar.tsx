"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShieldCheck, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react"

export function ConsoleSidebar() {
    const pathname = usePathname()

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, href: "/app" },
        { name: "Compliance", icon: ShieldCheck, href: "/app/compliance" },
        { name: "Reports", icon: FileText, href: "/app/reports" },
        { name: "Settings", icon: Settings, href: "/app/settings" },
    ]

    return (
        <aside className="w-64 border-r border-white/10 glass hidden md:flex flex-col fixed h-full z-10">
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <Link className="flex items-center gap-2 font-bold text-xl tracking-wider text-white" href="/">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <span>ORBYTE</span>
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary border border-primary/20 neon-glow"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 mb-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Pilot User</p>
                        <p className="text-xs text-muted-foreground truncate">pilot@orbyte.io</p>
                    </div>
                </div>
                <Link href="/api/auth/signout">
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-500/10">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </Link>
            </div>
        </aside>
    )
}

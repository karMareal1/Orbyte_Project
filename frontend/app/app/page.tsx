"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Leaf, Activity, Zap, ArrowUpRight, Clock, AlertTriangle } from "lucide-react"

export default function ConsolePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white neon-text">Overview</h1>
                    <p className="text-muted-foreground">Welcome back, Pilot. Systems are nominal.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 glass">
                        <Clock className="mr-2 h-4 w-4" /> Last Scan: 2m ago
                    </Button>
                    <Button className="bg-primary text-black hover:bg-cyan-400 neon-glow">
                        <Zap className="mr-2 h-4 w-4" /> Run Quick Audit
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card border-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary">Compliance Score</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">92%</div>
                        <p className="text-xs text-muted-foreground">+2% from last week</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-400">Carbon Footprint</CardTitle>
                        <Leaf className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12.4t</div>
                        <p className="text-xs text-muted-foreground">-0.8t saved this month</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-400">Active Alerts</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">3</div>
                        <p className="text-xs text-muted-foreground">1 High Priority</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-400">System Status</CardTitle>
                        <Activity className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">Operational</div>
                        <p className="text-xs text-muted-foreground">All regions healthy</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 glass-card border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { action: "Compliance Scan Completed", time: "2 minutes ago", status: "Success", color: "text-green-400" },
                                { action: "New Policy Violation Detected", time: "1 hour ago", status: "Warning", color: "text-orange-400" },
                                { action: "Sustainability Report Generated", time: "3 hours ago", status: "Success", color: "text-green-400" },
                                { action: "User Login: admin@orbyte.io", time: "5 hours ago", status: "Info", color: "text-blue-400" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <div className={`ml-4 space-y-1`}>
                                        <p className="text-sm font-medium leading-none text-white">{item.action}</p>
                                        <p className="text-sm text-muted-foreground">{item.time}</p>
                                    </div>
                                    <div className={`ml-auto font-medium ${item.color}`}>{item.status}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 glass-card border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-left h-12">
                            <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                            Generate Compliance Report
                            <ArrowUpRight className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-left h-12">
                            <Leaf className="mr-2 h-4 w-4 text-green-400" />
                            Optimize Resource Usage
                            <ArrowUpRight className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 text-left h-12">
                            <Activity className="mr-2 h-4 w-4 text-purple-400" />
                            Run Scenario Simulation
                            <ArrowUpRight className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

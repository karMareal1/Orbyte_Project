"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight, Lock } from "lucide-react"

export default function CompliancePage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white neon-text">Compliance Center</h1>
                    <p className="text-muted-foreground">Monitor and enforce security controls across your infrastructure.</p>
                </div>
                <Button className="bg-primary text-black hover:bg-cyan-400 neon-glow">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Run Full Audit
                </Button>
            </div>

            {/* Framework Status */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { name: "NIST 800-53", status: "Passing", score: "98%", color: "text-green-400", border: "border-green-400/50" },
                    { name: "SOC 2 Type II", status: "At Risk", score: "85%", color: "text-orange-400", border: "border-orange-400/50" },
                    { name: "ISO 27001", status: "Passing", score: "100%", color: "text-green-400", border: "border-green-400/50" },
                ].map((framework, i) => (
                    <Card key={i} className={`glass-card ${framework.border} shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-bold text-white">{framework.name}</CardTitle>
                            <Lock className={`h-5 w-5 ${framework.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-3xl font-bold ${framework.color} mb-1`}>{framework.score}</div>
                            <p className="text-sm text-muted-foreground">Status: <span className={framework.color}>{framework.status}</span></p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Controls List */}
            <Card className="glass-card border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Active Controls</CardTitle>
                    <CardDescription>Real-time monitoring of 142 security controls.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { id: "AC-2", name: "Account Management", status: "Compliant", icon: CheckCircle, color: "text-green-400" },
                            { id: "AU-6", name: "Audit Review, Analysis, and Reporting", status: "Non-Compliant", icon: AlertTriangle, color: "text-red-400" },
                            { id: "SC-7", name: "Boundary Protection", status: "Compliant", icon: CheckCircle, color: "text-green-400" },
                            { id: "SI-4", name: "Information System Monitoring", status: "Warning", icon: AlertTriangle, color: "text-orange-400" },
                            { id: "IA-2", name: "Identification and Authentication", status: "Compliant", icon: CheckCircle, color: "text-green-400" },
                        ].map((control, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full bg-black/50 ${control.color}`}>
                                        <control.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{control.id}: {control.name}</p>
                                        <p className={`text-xs ${control.color}`}>{control.status}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                                    Details <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

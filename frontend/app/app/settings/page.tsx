"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Bell, Key, Shield } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white neon-text">Settings</h1>
                <p className="text-muted-foreground">Manage your profile and system configuration.</p>
            </div>

            <Card className="glass-card border-white/10">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <CardTitle className="text-white">Profile Information</CardTitle>
                    </div>
                    <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                            <Input defaultValue="Pilot User" className="bg-black/50 border-white/10 text-white focus:border-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                            <Input defaultValue="pilot@orbyte.io" className="bg-black/50 border-white/10 text-white focus:border-primary" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="bg-primary text-black hover:bg-cyan-400">Save Changes</Button>
                </CardFooter>
            </Card>

            <Card className="glass-card border-white/10">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-secondary" />
                        <CardTitle className="text-white">API Keys</CardTitle>
                    </div>
                    <CardDescription>Manage access to the Orbyte API.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Active Key</label>
                        <div className="flex gap-2">
                            <Input value="orb_live_89237489237489" readOnly className="bg-black/50 border-white/10 text-muted-foreground font-mono" />
                            <Button variant="outline" className="border-white/10 hover:bg-white/5">Copy</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/50">Revoke Key</Button>
                </CardFooter>
            </Card>

            <Card className="glass-card border-white/10">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-accent" />
                        <CardTitle className="text-white">Notifications</CardTitle>
                    </div>
                    <CardDescription>Configure how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <div>
                            <p className="font-medium text-white">Email Alerts</p>
                            <p className="text-sm text-muted-foreground">Receive daily summaries and critical alerts.</p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                            <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <div>
                            <p className="font-medium text-white">Slack Integration</p>
                            <p className="text-sm text-muted-foreground">Send notifications to a Slack channel.</p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-white/10 relative cursor-pointer">
                            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white/50 shadow-sm" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

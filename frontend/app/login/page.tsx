"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ShieldCheck, ArrowLeft, Lock, Mail } from "lucide-react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden items-center justify-center">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

            <div className="absolute top-8 left-8">
                <Link href="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
            </div>

            <Card className="w-full max-w-md glass-card border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter your credentials to access the console.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                className="pl-10 bg-black/50 border-white/10 focus:border-primary focus:ring-primary text-white placeholder:text-muted-foreground/50"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="pl-10 bg-black/50 border-white/10 focus:border-primary focus:ring-primary text-white placeholder:text-muted-foreground/50"
                            />
                        </div>
                    </div>
                    <Button className="w-full bg-primary text-black hover:bg-cyan-400 neon-glow h-11">
                        Sign In
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black/50 px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-white/10 hover:bg-white/5 hover:text-white"
                        onClick={() => signIn("google", { callbackUrl: "/app" })}
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-primary transition-colors">
                        Forgot your password?
                    </Link>
                    <div>
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="text-primary hover:text-cyan-300 transition-colors font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

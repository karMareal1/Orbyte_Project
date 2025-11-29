"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Filter, Calendar } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white neon-text">Reports Vault</h1>
                    <p className="text-muted-foreground">Access and download your compliance artifacts.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-muted-foreground">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" /> Date Range
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {[
                    { title: "Monthly Compliance Summary", date: "Oct 2024", type: "PDF", size: "2.4 MB" },
                    { title: "SOC 2 Evidence Package", date: "Oct 2024", type: "ZIP", size: "145 MB" },
                    { title: "Sustainability Impact Report", date: "Sep 2024", type: "PDF", size: "1.8 MB" },
                    { title: "Vulnerability Scan Results", date: "Sep 2024", type: "CSV", size: "450 KB" },
                    { title: "User Access Review", date: "Aug 2024", type: "XLSX", size: "890 KB" },
                ].map((report, i) => (
                    <Card key={i} className="glass-card border-white/5 hover:border-primary/50 transition-all duration-300 group">
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:neon-glow transition-all">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{report.title}</h3>
                                    <p className="text-sm text-muted-foreground">Generated: {report.date} • {report.type} • {report.size}</p>
                                </div>
                            </div>
                            <Button variant="outline" className="border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

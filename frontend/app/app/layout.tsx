import { ConsoleSidebar } from "@/components/console-sidebar"

export default function ConsoleLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <ConsoleSidebar />
            <main className="flex-1 md:ml-64 min-h-screen bg-background">
                <div className="container py-8 px-4 md:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

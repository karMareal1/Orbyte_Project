import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, description }: StatCardProps) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon size={20} />
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{value}</span>
                {trend && (
                    <span className={`text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                        {trend}
                    </span>
                )}
            </div>
            {description && (
                <p className="mt-2 text-xs text-gray-500">{description}</p>
            )}
        </div>
    );
}

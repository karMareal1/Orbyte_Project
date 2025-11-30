"use client";

import { useEffect, useState } from "react";
import { fetchOverview, OverviewData } from "@/lib/api";
import { StatCard } from "@/components/stat-card";
import { Shield, Leaf, AlertTriangle, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function OverviewPage() {
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOverview()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-8 space-y-8 animate-pulse">
                <div className="h-8 w-48 bg-white/10 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-white/5 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!data) return <div className="p-8 text-red-400">Failed to load data</div>;

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Overview</h1>
                <p className="text-gray-400">Real-time compliance and sustainability metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Compliance Score"
                    value={`${data.compliance_score}%`}
                    icon={Shield}
                    trend="+2.4%"
                    trendUp={true}
                />
                <StatCard
                    title="Sustainability Score"
                    value={`${data.sustainability_score}%`}
                    icon={Leaf}
                    trend="+5.1%"
                    trendUp={true}
                />
                <StatCard
                    title="Open Risks"
                    value={data.open_risks}
                    icon={AlertTriangle}
                    trend="-3"
                    trendUp={true} // Less risks is good
                    description="Critical & High severity"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Compliance Trend */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
                    <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                        <Activity size={20} className="text-cyan-400" />
                        Compliance Trend
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.compliance_trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis
                                    dataKey="timestamp"
                                    stroke="#9ca3af"
                                    tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                />
                                <YAxis stroke="#9ca3af" domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#22d3ee"
                                    strokeWidth={2}
                                    dot={{ fill: '#22d3ee' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Emissions Trend */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
                    <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                        <Leaf size={20} className="text-green-400" />
                        Emissions Trend (kg CO2e)
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.emissions_trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis
                                    dataKey="timestamp"
                                    stroke="#9ca3af"
                                    tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="emissions_kg"
                                    stroke="#4ade80"
                                    strokeWidth={2}
                                    dot={{ fill: '#4ade80' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

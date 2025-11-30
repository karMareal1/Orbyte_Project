"use client";

import { useEffect, useState } from "react";
import { fetchSustainabilityMetrics, SustainabilityMetrics } from "@/lib/api";
import { StatCard } from "@/components/stat-card";
import { Leaf, DollarSign, Server, Zap, MapPin } from "lucide-react";

export default function SustainabilityPage() {
    const [metrics, setMetrics] = useState<SustainabilityMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSustainabilityMetrics()
            .then(setMetrics)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-white">Loading metrics...</div>;
    if (!metrics) return <div className="p-8 text-red-400">Failed to load metrics</div>;

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Sustainability</h1>
                <p className="text-gray-400">Track and reduce your cloud carbon footprint</p>
            </div>

            {/* AI Insight */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={100} className="text-cyan-400" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-lg font-medium text-cyan-400 mb-2 flex items-center gap-2">
                        <Zap size={20} />
                        Orbyte Insight
                    </h3>
                    <p className="text-xl text-white font-light leading-relaxed">
                        {metrics.ai_insight}
                    </p>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Monthly Emissions"
                    value={`${metrics.total_monthly_emissions_kg.toFixed(0)} kg`}
                    icon={Leaf}
                    description="CO2e estimated"
                />
                <StatCard
                    title="Potential Savings"
                    value={`$${metrics.potential_monthly_cost_savings_usd.toFixed(0)}`}
                    icon={DollarSign}
                    trend={`${metrics.potential_monthly_emissions_savings_kg.toFixed(0)} kg CO2e`}
                    trendUp={true}
                    description="Monthly opportunity"
                />
                <StatCard
                    title="Idle Resources"
                    value={metrics.idle_resources.length}
                    icon={Server}
                    description="Candidates for shutdown"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Emissions by Region */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                        <MapPin size={20} className="text-gray-400" />
                        Emissions by Region
                    </h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-gray-400">
                                <tr>
                                    <th className="p-4 font-medium">Region</th>
                                    <th className="p-4 font-medium text-right">Emissions (kg)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {metrics.emissions_by_region.map((r) => (
                                    <tr key={r.region} className="hover:bg-white/5">
                                        <td className="p-4 text-white">{r.region}</td>
                                        <td className="p-4 text-right text-gray-300">{r.emissions_kg.toFixed(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Idle Resources */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                        <Server size={20} className="text-gray-400" />
                        Idle Resources
                    </h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/5 text-gray-400">
                                <tr>
                                    <th className="p-4 font-medium">Resource</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium text-right">Cost/Mo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {metrics.idle_resources.map((r) => (
                                    <tr key={r.id} className="hover:bg-white/5">
                                        <td className="p-4">
                                            <div className="text-white font-medium">{r.name}</div>
                                            <div className="text-xs text-gray-500">{r.id}</div>
                                        </td>
                                        <td className="p-4 text-gray-400">{r.instance_type}</td>
                                        <td className="p-4 text-right text-green-400">${(r.daily_cost_usd * 30).toFixed(0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

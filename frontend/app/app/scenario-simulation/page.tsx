"use client";

import { useState } from "react";
import { runSimulation, SimulationResult } from "@/lib/api";
import { Play, RotateCcw, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ScenarioSimulationPage() {
    const [simulationType, setSimulationType] = useState("idle_shutdown");
    const [workloadPercent, setWorkloadPercent] = useState(50);
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await runSimulation({
                simulation_type: simulationType,
                workload_percent: workloadPercent,
                source_region: "us-central1", // Mock default
                target_region: "us-west1",   // Mock default
            });
            setResult(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Scenario Simulation</h1>
                <p className="text-gray-400">Forecast the impact of infrastructure changes before applying them.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Configuration Panel */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg space-y-6">
                    <h2 className="text-lg font-medium text-white flex items-center gap-2">
                        <RotateCcw size={20} className="text-cyan-400" />
                        Configure Scenario
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Simulation Type</label>
                            <select
                                value={simulationType}
                                onChange={(e) => setSimulationType(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                            >
                                <option value="idle_shutdown">Idle Resource Shutdown</option>
                                <option value="region_migration">Region Migration</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Scope ({workloadPercent}%)
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="100"
                                step="10"
                                value={workloadPercent}
                                onChange={(e) => setWorkloadPercent(Number(e.target.value))}
                                className="w-full accent-cyan-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Percentage of applicable resources to include in simulation.
                            </p>
                        </div>

                        <button
                            onClick={handleRun}
                            disabled={loading}
                            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>Analyzing...</>
                            ) : (
                                <>
                                    <Play size={18} /> Run Simulation
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Result Panel */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-xl bg-white/5 border border-white/10 border-dashed">
                            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                            <div>
                                <p className="text-white font-medium">Vertex AI is simulating...</p>
                                <p className="text-sm text-gray-500">Calculating emissions and cost impact</p>
                            </div>
                        </div>
                    ) : result ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            {/* Impact Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                    <p className="text-xs text-green-400 mb-1">Emissions Reduction</p>
                                    <p className="text-2xl font-bold text-white">
                                        {result.estimated_emissions_reduction_kg.toFixed(0)} <span className="text-sm font-normal text-gray-400">kg</span>
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                    <p className="text-xs text-cyan-400 mb-1">Cost Savings</p>
                                    <p className="text-2xl font-bold text-white">
                                        ${result.estimated_cost_savings_usd.toFixed(0)} <span className="text-sm font-normal text-gray-400">/mo</span>
                                    </p>
                                </div>
                            </div>

                            {/* AI Summary */}
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-cyan-400" />
                                    Executive Summary
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {result.detail_summary}
                                </p>
                            </div>

                            {/* Risk Assessment */}
                            <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                <h3 className="text-sm font-medium text-orange-400 mb-3 flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    Risk Assessment
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {result.risk_summary}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 text-center rounded-xl bg-white/5 border border-white/10 border-dashed">
                            <p className="text-gray-500">Run a simulation to see AI-forecasted results.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

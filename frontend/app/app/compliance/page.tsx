"use client";

import { useEffect, useState } from "react";
import { fetchComplianceControls, analyzeControl, Control, AnalysisResult } from "@/lib/api";
import { ShieldCheck, AlertTriangle, CheckCircle, ArrowRight, Loader2, BrainCircuit } from "lucide-react";

export default function CompliancePage() {
    const [controls, setControls] = useState<Control[]>([]);
    const [selectedControl, setSelectedControl] = useState<Control | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComplianceControls()
            .then(setControls)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleAnalyze = async (control: Control) => {
        setSelectedControl(control);
        setAnalysis(null);
        setAnalyzing(true);
        try {
            const result = await analyzeControl(control.id);
            setAnalysis(result);
        } catch (error) {
            console.error(error);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Main List */}
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold text-white mb-6">Compliance Controls</h1>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-lg animate-pulse" />)}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {controls.map((control) => (
                            <div
                                key={control.id}
                                onClick={() => handleAnalyze(control)}
                                className={`
                  flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all
                  ${selectedControl?.id === control.id ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}
                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`
                    p-2 rounded-full 
                    ${control.status === 'pass' ? 'text-green-400 bg-green-400/10' :
                                            control.status === 'fail' ? 'text-red-400 bg-red-400/10' : 'text-orange-400 bg-orange-400/10'}
                  `}>
                                        {control.status === 'pass' ? <CheckCircle size={20} /> :
                                            control.status === 'fail' ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-cyan-400">{control.id}</span>
                                            <span className="text-white font-medium">{control.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                            <span className="uppercase">{control.framework}</span>
                                            <span>•</span>
                                            <span className="capitalize">{control.severity} Severity</span>
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-gray-500" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Side Panel */}
            {selectedControl && (
                <div className="w-96 border-l border-white/10 bg-black/20 backdrop-blur-xl p-6 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-2">{selectedControl.id} Analysis</h2>
                        <p className="text-sm text-gray-400">{selectedControl.description}</p>
                    </div>

                    {analyzing ? (
                        <div className="space-y-6 py-12">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse" />
                                    <BrainCircuit size={48} className="text-cyan-400 animate-pulse relative z-10" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-cyan-400 font-medium">Orbyte AI is thinking...</p>
                                    <div className="text-xs text-gray-500 space-y-1">
                                        <p className="animate-fade-in">Retrieving evidence...</p>
                                        <p className="animate-fade-in delay-75">Analyzing with Vertex AI...</p>
                                        <p className="animate-fade-in delay-150">Drafting statement...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : analysis ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                <h3 className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
                                    <BrainCircuit size={16} />
                                    Implementation Statement
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {analysis.implementation_statement}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg bg-white/5">
                                    <p className="text-xs text-gray-500 mb-1">Status</p>
                                    <p className={`font-medium capitalize ${analysis.status === 'pass' ? 'text-green-400' :
                                            analysis.status === 'fail' ? 'text-red-400' : 'text-orange-400'
                                        }`}>
                                        {analysis.status}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-white/5">
                                    <p className="text-xs text-gray-500 mb-1">Confidence</p>
                                    <p className="font-medium text-white">
                                        {(analysis.analysis_confidence * 100).toFixed(0)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

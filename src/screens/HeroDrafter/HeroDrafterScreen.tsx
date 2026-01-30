import { useHeroDrafterController } from './HeroDrafterController';
import { HeroCard } from '../../components/HeroCard';
import { User, Skull, AlertTriangle, RotateCcw } from 'lucide-react';
import heroDataRaw from '../../hero-config.json';
import { Hero } from '../../types/hero';

const allHeroes = heroDataRaw as unknown as Hero[];

export const HeroDrafterScreen = () => {
    const { yourTeam, enemyTeam, toggleHero, recommendations, resetTeams } = useHeroDrafterController();

    const isTeammate = (hero: Hero) => yourTeam.some(h => h.hero === hero.hero);
    const isEnemy = (hero: Hero) => enemyTeam.some(h => h.hero === hero.hero);

    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-slate-900 text-slate-100">
            {/* Header */}
            <header className="flex-none h-16 border-b border-slate-800 flex items-center px-6 bg-slate-900 z-10">
                <h1 className="text-xl font-bold text-orange-500 tracking-tight">OW2 Hero Drafter</h1>
                <div className="ml-auto flex gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2"><User size={16} className="text-orange-500" /> Your Team ({yourTeam.length}/5)</div>
                    <div className="flex items-center gap-2"><Skull size={16} className="text-red-500" /> Enemy Team ({enemyTeam.length}/5)</div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content - Hero Grid */}
                <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex justify-start mb-2">
                            <button
                                onClick={resetTeams}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white text-sm transition-colors"
                            >
                                <RotateCcw size={14} />
                                <span>Reset Draft</span>
                            </button>
                        </div>
                        {['tank', 'dps', 'support'].map((role) => (
                            <section key={role}>
                                <h2 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-4 border-l-4 border-orange-500 pl-3">
                                    {role === 'dps' ? 'Damage' : role}
                                </h2>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-4">
                                    {allHeroes.filter(h => h.role === role).map(hero => (
                                        <HeroCard 
                                            key={hero.hero} 
                                            hero={hero}
                                            isTeammate={isTeammate(hero)}
                                            isEnemy={isEnemy(hero)}
                                            onToggle={toggleHero}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </main>

                {/* Sidebar - Recommendations */}
                <aside className="w-80 bg-slate-950 border-l border-slate-800 flex flex-col">
                    <div className="p-4 border-b border-slate-800 bg-slate-950">
                        <h2 className="font-bold text-slate-100">Recommendations</h2>
                        <p className="text-xs text-slate-500 mt-1">Based on synergies & counters</p>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Top Picks */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                                <span>Top Picks</span>
                            </h3>
                            <div className="space-y-1">
                                {recommendations.filter(r => r.score > 0).slice(0, 5).map(({ hero, score }) => (
                                    <div key={hero.hero} className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-transparent hover:border-slate-700">
                                        <span className="font-medium text-slate-200">{hero.hero}</span>
                                        <span className="font-bold text-green-500">+{score}</span>
                                    </div>
                                ))}
                                {recommendations.filter(r => r.score > 0).length === 0 && (
                                    <p className="text-sm text-slate-600 italic">Select teams to see picks</p>
                                )}
                            </div>
                        </div>

                        {/* Avoid */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2">
                                <AlertTriangle size={14} />
                                <span>Avoid</span>
                            </h3>
                            <div className="space-y-1">
                                {recommendations.filter(r => r.score < 0).reverse().slice(0, 5).map(({ hero, score }) => (
                                    <div key={hero.hero} className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-transparent border-l-2 border-l-red-900">
                                        <span className="font-medium text-slate-400">{hero.hero}</span>
                                        <span className="font-bold text-red-500">{score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

import { Hero } from '../../types/hero';
import { useHeroCardController } from './HeroCardController';
import clsx from 'clsx';
import { User, Skull } from 'lucide-react';

interface HeroCardProps {
  hero: Hero;
  isTeammate: boolean;
  isEnemy: boolean;
  onToggle: (hero: Hero, team: 'yours' | 'enemy') => void;
}

export const HeroCard = ({ hero, isTeammate, isEnemy, onToggle }: HeroCardProps) => {
  const { selectionState, handleSelectTeammate, handleSelectEnemy } = useHeroCardController({
    hero,
    isTeammate,
    isEnemy,
    onToggle
  });

  return (
    <div 
      className={clsx(
        "relative w-24 h-24 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 border-2",
        selectionState === 'none' && "bg-slate-800 border-slate-700 hover:border-slate-500",
        selectionState === 'teammate' && "bg-slate-800 border-orange-500 shadow-[0_0_10px_rgba(250,129,18,0.3)]",
        selectionState === 'enemy' && "bg-red-950/30 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
        selectionState === 'both' && "border-2 border-transparent bg-slate-800 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
      )}
      style={selectionState === 'both' ? {
        background: 'linear-gradient(90deg, rgba(234,88,12,0.2) 0%, rgba(234,88,12,0.2) 50%, rgba(239,68,68,0.2) 50%, rgba(239,68,68,0.2) 100%)',
        borderImage: 'linear-gradient(90deg, #f97316 50%, #ef4444 50%) 1'
      } : undefined}
      onClick={handleSelectTeammate}
      onContextMenu={handleSelectEnemy}
      title="Left Click: Your Team | Right Click: Enemy Team"
    >
        {/* Placeholder Icon / Image */}
        <div className="text-2xl font-bold text-slate-400 mb-1">
            {hero.hero.substring(0, 2).toUpperCase()}
        </div>
        
        <span className="text-xs text-center font-medium leading-tight px-1 truncate w-full">
            {hero.hero}
        </span>

        {/* Status Indicator */}
        {selectionState === 'teammate' && (
            <div className="absolute -top-2 -right-2 rounded-full p-1 bg-orange-500">
                <User size={12} className="text-white" />
            </div>
        )}
        {selectionState === 'enemy' && (
            <div className="absolute -top-2 -right-2 rounded-full p-1 bg-red-500">
                <Skull size={12} className="text-white" />
            </div>
        )}
        {selectionState === 'both' && (
            <div className="absolute -top-2 -right-2 flex">
                <div className="rounded-full p-1 bg-orange-500 -mr-1 z-10 border border-slate-900">
                    <User size={10} className="text-white" />
                </div>
                <div className="rounded-full p-1 bg-red-500 border border-slate-900">
                    <Skull size={10} className="text-white" />
                </div>
            </div>
        )}
    </div>
  );
};

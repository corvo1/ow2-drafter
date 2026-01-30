import { useCallback } from 'react';
import { Hero } from '../../types/hero';

interface UseHeroCardControllerProps {
    hero: Hero;
    isTeammate: boolean;
    isEnemy: boolean;
    onToggle: (hero: Hero, team: 'yours' | 'enemy') => void;
}

export const useHeroCardController = ({ hero, isTeammate, isEnemy, onToggle }: UseHeroCardControllerProps) => {
    
    const selectionState: 'none' | 'teammate' | 'enemy' | 'both' = 
        isTeammate && isEnemy ? 'both' : isTeammate ? 'teammate' : isEnemy ? 'enemy' : 'none';

    const handleSelectTeammate = useCallback(() => {
        onToggle(hero, 'yours');
    }, [onToggle, hero]);

    const handleSelectEnemy = useCallback((e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default context menu
        onToggle(hero, 'enemy');
    }, [onToggle, hero]);

    return {
        selectionState,
        handleSelectTeammate,
        handleSelectEnemy
    };
};

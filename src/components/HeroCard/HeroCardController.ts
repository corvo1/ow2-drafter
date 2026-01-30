import { Hero } from '../../types/hero';

interface UseHeroCardControllerProps {
    hero: Hero;
    isTeammate: boolean;
    isEnemy: boolean;
    onToggle: (hero: Hero, team: 'yours' | 'enemy') => void;
}

export const useHeroCardController = ({ hero, isTeammate, isEnemy, onToggle }: UseHeroCardControllerProps) => {
    
    const selectionState = isTeammate ? 'teammate' : isEnemy ? 'enemy' : 'none';

    const handleSelectTeammate = () => {
        onToggle(hero, 'yours');
    };

    const handleSelectEnemy = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default context menu
        onToggle(hero, 'enemy');
    };

    return {
        selectionState,
        handleSelectTeammate,
        handleSelectEnemy
    };
};

import { useState, useMemo } from 'react';
import { Hero } from '../../types/hero';
import heroDataRaw from '../../hero-config.json';

// Cast as unknown first to bypass strict index signature checks against the JSON shape
const heroData = heroDataRaw as unknown as Hero[];

export const useHeroDrafterController = () => {
  const [yourTeam, setYourTeam] = useState<Hero[]>([]);
  const [enemyTeam, setEnemyTeam] = useState<Hero[]>([]);
  
  // Filter out heroes already picked
  const availableHeroes = useMemo(() => {
    const pickedNames = new Set([...yourTeam, ...enemyTeam].map(h => h.hero));
    return heroData.filter(h => !pickedNames.has(h.hero));
  }, [yourTeam, enemyTeam]);

  const toggleHero = (hero: Hero, team: 'yours' | 'enemy') => {
    if (team === 'yours') {
      setYourTeam(prev => {
        if (prev.find(h => h.hero === hero.hero)) return prev.filter(h => h.hero !== hero.hero);
        return [...prev, hero];
      });
    } else {
      setEnemyTeam(prev => {
        if (prev.find(h => h.hero === hero.hero)) return prev.filter(h => h.hero !== hero.hero);
        return [...prev, hero];
      });
    }
  };

  const calculateScore = (hero: Hero) => {
    let score = 0;

    // Synergy with your team
    yourTeam.forEach(teammate => {
      // hero.play_with[teammate]
      if (hero.play_with && hero.play_with[teammate.hero]) {
        score += hero.play_with[teammate.hero];
      }
      // teammate.play_with[hero] ? (Usually symmetric logic or one-way synergy?)
      // Spec says: "Sum of Synergy (play_with) and Counter (counter)"
      // Spec example: Kiriko (Hero) with Genji (Teammate). Kiriko.play_with[Genji] is +5.
    });

    // Countering enemy team
    enemyTeam.forEach(enemy => {
      // hero.counter[enemy] ?
      // Spec example: Kiriko (Hero) vs Roadhog (Enemy). Kiriko.counter[Roadhog] is +5.
      if (hero.counter && hero.counter[enemy.hero]) {
        score += hero.counter[enemy.hero];
      }
    });

    return score;
  };

  const recommendations = useMemo(() => {
    return availableHeroes.map(hero => ({
      hero,
      score: calculateScore(hero)
    })).sort((a, b) => b.score - a.score);
  }, [availableHeroes, yourTeam, enemyTeam]);

  return {
    yourTeam,
    enemyTeam,
    availableHeroes,
    toggleHero,
    recommendations
  };
};

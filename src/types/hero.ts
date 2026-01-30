export type Role = 'tank' | 'dps' | 'support';

export interface Hero {
  hero: string;
  role: Role;
  counter: Record<string, number>;
  play_with: Record<string, number>;
}

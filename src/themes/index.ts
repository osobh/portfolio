export interface ThemeColors {
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceHover: string;
  primary: string;
  primaryLight: string;
  accent: string;
  text: string;
  textMuted: string;
  textDim: string;
  border: string;
  glow: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
}

export interface ThemeEffects {
  scanlines: boolean;
  glitch: boolean;
  crt: boolean;
  neonGlow: boolean;
  rain: boolean;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  effects: ThemeEffects;
  background3D: 'neural' | 'radar' | 'neon' | 'matrix';
  cardStyle: 'glass' | 'chunky' | 'neon' | 'terminal';
}

export const themes: Record<string, Theme> = {
  'ai-professional': {
    id: 'ai-professional',
    name: 'AI Professional',
    colors: {
      background: '#0a0a0f',
      backgroundAlt: '#0f172a',
      surface: 'rgba(30, 41, 59, 0.5)',
      surfaceHover: 'rgba(30, 41, 59, 0.7)',
      primary: '#06b6d4',
      primaryLight: '#22d3ee',
      accent: '#06b6d4',
      text: '#ffffff',
      textMuted: '#94a3b8',
      textDim: '#64748b',
      border: 'rgba(148, 163, 184, 0.1)',
      glow: 'rgba(6, 182, 212, 0.3)',
    },
    fonts: {
      heading: 'var(--font-space)',
      body: 'var(--font-inter)',
      mono: 'var(--font-mono)',
    },
    effects: {
      scanlines: false,
      glitch: false,
      crt: false,
      neonGlow: true,
      rain: false,
    },
    background3D: 'neural',
    cardStyle: 'glass',
  },

  'vault73': {
    id: 'vault73',
    name: 'Vault73',
    colors: {
      background: '#0a0a00',
      backgroundAlt: '#141400',
      surface: 'rgba(20, 30, 10, 0.8)',
      surfaceHover: 'rgba(30, 40, 15, 0.9)',
      primary: '#FFB000',
      primaryLight: '#FFCC33',
      accent: '#33FF33',
      text: '#FFB000',
      textMuted: '#CC8800',
      textDim: '#886600',
      border: 'rgba(255, 176, 0, 0.3)',
      glow: 'rgba(255, 176, 0, 0.4)',
    },
    fonts: {
      heading: 'var(--font-vt323)',
      body: 'var(--font-share-tech)',
      mono: 'var(--font-share-tech)',
    },
    effects: {
      scanlines: true,
      glitch: false,
      crt: true,
      neonGlow: false,
      rain: false,
    },
    background3D: 'radar',
    cardStyle: 'chunky',
  },

  'cyberpunk': {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      background: '#0a0010',
      backgroundAlt: '#120020',
      surface: 'rgba(30, 0, 50, 0.6)',
      surfaceHover: 'rgba(50, 0, 80, 0.7)',
      primary: '#FF2D95',
      primaryLight: '#FF5CB0',
      accent: '#00FFFF',
      text: '#ffffff',
      textMuted: '#FF2D95',
      textDim: '#9D00FF',
      border: 'rgba(255, 45, 149, 0.4)',
      glow: 'rgba(255, 45, 149, 0.5)',
    },
    fonts: {
      heading: 'var(--font-orbitron)',
      body: 'var(--font-rajdhani)',
      mono: 'var(--font-share-tech)',
    },
    effects: {
      scanlines: false,
      glitch: true,
      crt: false,
      neonGlow: true,
      rain: true,
    },
    background3D: 'neon',
    cardStyle: 'neon',
  },

  'matrix': {
    id: 'matrix',
    name: 'Matrix',
    colors: {
      background: '#000000',
      backgroundAlt: '#001100',
      surface: 'rgba(0, 20, 0, 0.7)',
      surfaceHover: 'rgba(0, 40, 0, 0.8)',
      primary: '#00FF41',
      primaryLight: '#33FF66',
      accent: '#00FF41',
      text: '#00FF41',
      textMuted: '#00CC33',
      textDim: '#008822',
      border: 'rgba(0, 255, 65, 0.3)',
      glow: 'rgba(0, 255, 65, 0.4)',
    },
    fonts: {
      heading: 'var(--font-share-tech)',
      body: 'var(--font-share-tech)',
      mono: 'var(--font-share-tech)',
    },
    effects: {
      scanlines: false,
      glitch: false,
      crt: false,
      neonGlow: true,
      rain: false,
    },
    background3D: 'matrix',
    cardStyle: 'terminal',
  },
};

export const themeList = Object.values(themes);
export type ThemeId = keyof typeof themes;

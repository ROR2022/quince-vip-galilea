// 💎 Utilidades para generación de diamantes animados

export interface DiamondData {
  id: number;
  delay: number;
  duration: number;
  size: 'small' | 'normal' | 'large' | 'extra-large';
  variant: 'normal' | 'fast' | 'slow';
  movementType: 'frame-top' | 'frame-bottom' | 'frame-left' | 'frame-right';
}

/**
 * Genera una array de diamantes con movimiento continuo
 * @param count - Número de diamantes a generar
 * @param options - Opciones de configuración
 */
export const generateDiamonds = (
  count: number = 25,
  options: {
    mobileOptimized?: boolean;
    sizeDistribution?: 'balanced' | 'mostly-small' | 'mixed';
    speedDistribution?: 'balanced' | 'mostly-slow' | 'mixed';
  } = {}
): DiamondData[] => {
  const {
    mobileOptimized = false,
    sizeDistribution = 'balanced',
    speedDistribution = 'balanced'
  } = options;

  const diamonds: DiamondData[] = [];
  
  // Ajustar cantidad para móviles
  const finalCount = mobileOptimized ? Math.min(count, 32) : count;
  
  // Los 4 tipos de marco distribuidos equitativamente
  const movementTypes: Array<'frame-top' | 'frame-bottom' | 'frame-left' | 'frame-right'> = 
    ['frame-top', 'frame-bottom', 'frame-left', 'frame-right'];

  for (let i = 0; i < finalCount; i++) {
    // Distribuir tipos de marco de forma equitativa
    const movementType = movementTypes[i % 4];

    const diamond: DiamondData = {
      id: i,
      delay: generateDelay(),
      duration: generateDuration(movementType),
      size: generateSize(sizeDistribution, mobileOptimized),
      variant: generateVariant(speedDistribution),
      movementType,
    };

    diamonds.push(diamond);
  }

  return diamonds;
};

/**
 * Genera un delay aleatorio distribuido para crear efecto escalonado
 */

const generateDelay = (): number => {
  return Math.random() * 8; // 0-8 segundos para mayor variación
};

/**
 * Genera duración optimizada según tipo de movimiento de marco
 */
const generateDuration = (movementType?: 'frame-top' | 'frame-bottom' | 'frame-left' | 'frame-right'): number => {
  switch (movementType) {
    case 'frame-top':
    case 'frame-bottom':
      return 6 + Math.random() * 3; // 6-9 segundos (movimiento horizontal)
    case 'frame-left':
    case 'frame-right':
      return 7 + Math.random() * 3; // 7-10 segundos (movimiento vertical)
    default:
      return 7 + Math.random() * 3; // duración por defecto
  }
};

/**
 * Genera un tamaño basado en la distribución especificada
 */
const generateSize = (
  distribution: 'balanced' | 'mostly-small' | 'mixed',
  mobileOptimized: boolean = false
): 'small' | 'normal' | 'large' | 'extra-large' => {
  const rand = Math.random();

  if (mobileOptimized) {
    // En móviles, usar todos los tamaños pero con balance
    if (rand < 0.3) return 'small';
    if (rand < 0.6) return 'normal';
    if (rand < 0.85) return 'large';
    return 'extra-large';
  }

  switch (distribution) {
    case 'mostly-small':
      if (rand < 0.5) return 'small';
      if (rand < 0.75) return 'normal';
      if (rand < 0.9) return 'large';
      return 'extra-large';
    
    case 'mixed':
      if (rand < 0.25) return 'small';
      if (rand < 0.5) return 'normal';
      if (rand < 0.75) return 'large';
      return 'extra-large';
    
    case 'balanced':
    default:
      if (rand < 0.3) return 'small';
      if (rand < 0.6) return 'normal';
      if (rand < 0.85) return 'large';
      return 'extra-large';
  }
};

/**
 * Genera una variante de velocidad basada en la distribución especificada
 */
const generateVariant = (
  distribution: 'balanced' | 'mostly-slow' | 'mixed'
): 'normal' | 'fast' | 'slow' => {
  const rand = Math.random();

  switch (distribution) {
    case 'mostly-slow':
      if (rand < 0.6) return 'slow';
      if (rand < 0.8) return 'normal';
      return 'fast';
    
    case 'mixed':
      if (rand < 0.33) return 'slow';
      if (rand < 0.66) return 'normal';
      return 'fast';
    
    case 'balanced':
    default:
      if (rand < 0.5) return 'normal';
      if (rand < 0.75) return 'slow';
      return 'fast';
  }
};

/**
 * Hook personalizado para detectar si es mobile
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Re-export React para el hook
import React from 'react';

/**
 * Configuraciones predefinidas para diferentes escenarios
 */
export const DIAMOND_PRESETS = {
  // Configuraciones predefinidas para diferentes escenarios
  default: {
    count: 40,
    options: {
      sizeDistribution: 'balanced' as const,
      speedDistribution: 'balanced' as const,
    }
  },
  
  // Configuración para móviles
  mobile: {
    count: 32,
    options: {
      mobileOptimized: true,
      sizeDistribution: 'balanced' as const,
      speedDistribution: 'mixed' as const,
    }
  },
  
  // Configuración intensa
  intense: {
    count: 35,
    options: {
      excludeCenter: true,
      sizeDistribution: 'mixed' as const,
      speedDistribution: 'mixed' as const,
    }
  },
  
  // Configuración sutil
  subtle: {
    count: 12,
    options: {
      excludeCenter: true,
      sizeDistribution: 'mostly-small' as const,
      speedDistribution: 'mostly-slow' as const,
    }
  }
} as const;
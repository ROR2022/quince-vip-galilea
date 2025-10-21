// 💎 AnimatedDiamond v2 - Componente con movimiento continuo
import React from 'react';
import { IoDiamondOutline } from 'react-icons/io5';

interface AnimatedDiamondProps {
  delay: number;
  duration: number;
  size?: 'small' | 'normal' | 'large' | 'extra-large';
  variant?: 'normal' | 'fast' | 'slow';
  movementType: 'frame-top' | 'frame-bottom' | 'frame-left' | 'frame-right';
}

const AnimatedDiamond: React.FC<AnimatedDiamondProps> = ({ 
  delay, 
  duration, 
  size = 'normal',
  variant = 'normal',
  movementType
}) => {
  // Configurar tamaños en pixels para iconos
  const getIconSize = () => {
    switch(size) {
      case 'small': return 32;
      case 'normal': return 48; 
      case 'large': return 64;
      case 'extra-large': return 80;
      default: return 48;
    }
  };

  // Configurar clase de movimiento basada en tipo de marco y velocidad
  const getMovementClass = () => {
    const speedSuffix = variant === 'fast' ? '-fast' : variant === 'slow' ? '-slow' : '-normal';
    return `diamond-${movementType}${speedSuffix}`;
  };

  // Configurar efectos de color
  const getColorClass = () => {
    const speedSuffix = variant === 'fast' ? '-fast' : variant === 'slow' ? '-slow' : '-normal';
    return `diamond-color${speedSuffix}`;
  };

  // Configurar colores dinámicos basados en delay
  const getColorClasses = () => {
    const colorVariation = Math.floor((delay * 10) % 6);
    switch(colorVariation) {
      case 0: return 'text-pink-400';
      case 1: return 'text-purple-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-rose-400';
      case 4: return 'text-pink-300';
      case 5: return 'text-violet-400';
      default: return 'text-pink-400';
    }
  };

  // Configurar efectos especiales basados en ID del diamante
  const getSpecialEffectClass = () => {
    const effectVariation = Math.floor((delay * 15) % 5);
    switch(effectVariation) {
      case 0: return 'diamond-sparkle';
      case 1: return 'diamond-glow-pulse';
      case 2: return 'diamond-shine';
      case 3: return 'diamond-ultra-sparkle';
      case 4: return 'diamond-rainbow';
      default: return 'diamond-sparkle';
    }
  };

  return (
    <div
      className={`
        absolute pointer-events-none z-10 
        ${getMovementClass()} 
        ${getColorClasses()}
        opacity-90
      `}
      style={{
        animationDelay: `${delay}s`,
        willChange: 'transform, opacity, filter',
        transform: 'translateZ(0)',
        '--icon-size': `${getIconSize()}px`
      } as React.CSSProperties & { '--icon-size': string }}
      aria-hidden="true"
    >
      <IoDiamondOutline
        size={getIconSize()}
        className="diamond-icon"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          filter: 'drop-shadow(0 0 15px currentColor) brightness(1.2)',
          contain: 'layout style paint',
        }}
      />
    </div>
  );
};

export default AnimatedDiamond;
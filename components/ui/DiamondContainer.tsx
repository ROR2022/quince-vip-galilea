// 💎 DiamondContainer - Contenedor optimizado para diamantes animados
import React, { useMemo, useEffect, useState } from 'react';
import AnimatedDiamond from './AnimatedDiamond';
import { generateDiamonds, DIAMOND_PRESETS, DiamondData } from '@/utils/diamondUtils';

interface DiamondContainerProps {
  className?: string;
  intensity?: 'subtle' | 'default' | 'intense';
  enableReducedMotion?: boolean;
}

const DiamondContainer: React.FC<DiamondContainerProps> = ({ 
  className = '', 
  intensity = 'default',
  enableReducedMotion = true
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detectar características del dispositivo
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      setIsMobile(window.innerWidth <= 768);
      
      if (enableReducedMotion) {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        
        const handleChange = (e: MediaQueryListEvent) => {
          setPrefersReducedMotion(e.matches);
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };

    checkDeviceCapabilities();
    window.addEventListener('resize', checkDeviceCapabilities);
    
    return () => window.removeEventListener('resize', checkDeviceCapabilities);
  }, [enableReducedMotion]);

  // Generar diamantes con configuración optimizada
  const diamonds = useMemo((): DiamondData[] => {
    // Si el usuario prefiere movimiento reducido, no mostrar diamantes
    if (prefersReducedMotion) {
      return [];
    }

    // Seleccionar preset basado en dispositivo e intensidad
    let preset;
    if (isMobile) {
      preset = intensity === 'subtle' ? DIAMOND_PRESETS.subtle : DIAMOND_PRESETS.mobile;
    } else {
      switch (intensity) {
        case 'subtle': preset = DIAMOND_PRESETS.subtle; break;
        case 'intense': preset = DIAMOND_PRESETS.intense; break;
        default: preset = DIAMOND_PRESETS.default; break;
      }
    }

    return generateDiamonds(preset.count, preset.options);
  }, [isMobile, intensity, prefersReducedMotion]);

  // Si no hay diamantes que mostrar, no renderizar nada
  if (diamonds.length === 0) {
    return null;
  }

  return (
    <div 
      className={`diamonds-container ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {diamonds.map((diamond) => (
        <AnimatedDiamond
          key={diamond.id}
          delay={diamond.delay}
          duration={diamond.duration}
          size={diamond.size}
          variant={diamond.variant}
          movementType={diamond.movementType}
        />
      ))}
    </div>
  );
};

export default DiamondContainer;
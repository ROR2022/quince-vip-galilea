// ================================================================
// 📁 constants/invitation.constants.ts
// ================================================================

import { EventInfo, RelationOption, CountryConfig, CountryOption } from '../types/invitation.types';
import { quinceMainData } from '@/components/sections/data/main-data';


const { hero, customInvitations, event } = quinceMainData;
export const ADMIN_PASSWORD = customInvitations.adminPassword || "admin123";

export const EVENT_INFO: EventInfo = {
  partyTitle: hero.subtitle || "Quinceañera de Frida",
  quinceaneraName: hero.name || "Aurora Valentina",
  date: event.date.full || "Sábado 27 de Diciembre 2025",
  time: event.ceremony.time || "7:00 PM",
  venue: event.ceremony.venue || "Capellania de Nuestra Señora de Guadalupe",
  dressCode: event.dressCode || "Formal - Azul solo la quinceañera -",
  invitationUrl: customInvitations.invitationUrl || "https://quince-vip-new-demo.vercel.app/"
} as const;

export const SUGGESTED_MESSAGES = [
  ...customInvitations.suggested_messages
] as const;

export const RELATION_OPTIONS: RelationOption[] = [
  { value: "", label: "Selecciona relación (opcional)" },
  { value: "familia", label: "👪 Familia" },
  { value: "amigos", label: "👭 Amigos" },
  { value: "padrinos", label: "🤝 Padrinos" },
  { value: "otros", label: "👥 Otros" }
] as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: "Por favor completa todos los campos obligatorios",
  INVALID_PHONE: "El número debe tener exactamente 10 dígitos",
  INVALID_PHONE_FORMAT: "Debe tener exactamente 10 dígitos",
  DOWNLOAD_SUCCESS: "¡Invitación descargada exitosamente!",
  DOWNLOAD_ERROR: "Error al descargar la invitación",
  AUTH_ERROR: "Contraseña incorrecta",
  DOWNLOAD_REQUIRED_FIELDS: "Por favor completa todos los campos obligatorios antes de descargar"
} as const;

export const UI_MESSAGES = {
  TOGGLE_PREVIEW_SHOW: "👁️ Ver Vista Previa",
  TOGGLE_PREVIEW_HIDE: "🙈 Ocultar Vista Previa",
  SEND_WHATSAPP: "📱 Enviar por WhatsApp",
  DOWNLOAD_READY: "💾 Descargar Imagen",
  DOWNLOAD_PROCESSING: "⏳ Generando imagen...",
  ACCESS_RESTRICTED: "🔐 Acceso Restringido",
  ADMIN_AUTHENTICATED: "Admin"
} as const;

// ================================================================
// CONFIGURACIÓN INTERNACIONAL DE PAÍSES
// ================================================================

export const COUNTRIES: Record<string, CountryConfig> = {
  mexico: {
    code: "+52",
    flag: "🇲🇽",
    name: "México",
    digits: 10,
    whatsappPrefix: "521",
    placeholder: "555 123 4567",
    formatPattern: /^\d{3} \d{3} \d{4}$/,
    inputMask: "XXX XXX XXXX"
  },
  usa: {
    code: "+1", 
    flag: "🇺🇸",
    name: "Estados Unidos",
    digits: 10,
    whatsappPrefix: "1",
    placeholder: "(555) 123-4567", 
    formatPattern: /^\(\d{3}\) \d{3}-\d{4}$/,
    inputMask: "(XXX) XXX-XXXX"
  }
} as const;

export const DEFAULT_COUNTRY = "mexico";

export const COUNTRY_OPTIONS: CountryOption[] = [
  { value: "mexico", label: `${COUNTRIES.mexico.flag} ${COUNTRIES.mexico.name}` },
  { value: "usa", label: `${COUNTRIES.usa.flag} ${COUNTRIES.usa.name}` }
] as const;

// ================================================================
// RETROCOMPATIBILIDAD - MANTIENE FUNCIONALIDAD EXISTENTE
// ================================================================

export const PHONE_CONFIG = {
  COUNTRY_CODE: COUNTRIES.mexico.code,
  FLAG: COUNTRIES.mexico.flag,
  MAX_LENGTH: 13,
  DIGITS_REQUIRED: COUNTRIES.mexico.digits,
  PLACEHOLDER: COUNTRIES.mexico.placeholder
} as const;

export const DOWNLOAD_CONFIG = {
  SCALE: 2,
  FORMAT: 'image/png' as const,
  QUALITY: 0.95,
  MIN_WIDTH: 600,
  MIN_HEIGHT: 800,
  FILE_PREFIX: "invitacion_"
} as const;

export const CSS_CLASSES = {
  GRADIENT_PRIMARY: "bg-gradient-to-r from-purple-700 via-fuchsia-500 to-purple-700",
  GRADIENT_SECONDARY: "bg-gradient-to-r from-fuchsia-500 to-purple-700",
  GRADIENT_SUCCESS: "bg-gradient-to-r from-green-500 to-green-600",
  GRADIENT_PREVIEW: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
  BORDER_FOCUS: "border-fuchsia-200 focus:ring-fuchsia-400 focus:ring-2 focus:border-transparent",
  BORDER_ERROR: "border-red-300 focus:ring-red-400"
} as const;
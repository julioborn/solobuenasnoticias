import {
  Landmark,
  FlaskConical,
  HeartPulse,
  Trophy,
  Cpu,
  Palette,
  Globe,
  TrendingUp,
  Newspaper,
} from 'lucide-react'
import type { NewsCategory } from '@/types'

export const CATEGORY_ICONS: Record<NewsCategory | 'Todas', React.ElementType> = {
  Todas:                Newspaper,
  Historia:             Landmark,
  Ciencia:              FlaskConical,
  Salud:                HeartPulse,
  Deportes:             Trophy,
  Tecnología:           Cpu,
  Cultura:              Palette,
  Internacional:        Globe,
  'Economía y Finanzas': TrendingUp,
}

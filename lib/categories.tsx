import {
  Landmark,
  FlaskConical,
  Leaf,
  HeartPulse,
  Apple,
  Trophy,
  Cpu,
  Palette,
  Globe,
  Newspaper,
} from 'lucide-react'
import type { NewsCategory } from '@/types'

export const CATEGORY_ICONS: Record<NewsCategory | 'Todas', React.ElementType> = {
  Todas:         Newspaper,
  Historia:      Landmark,
  Ciencia:       FlaskConical,
  Naturaleza:    Leaf,
  Salud:         HeartPulse,
  Nutrición:     Apple,
  Deportes:      Trophy,
  Tecnología:    Cpu,
  Cultura:       Palette,
  Internacional: Globe,
}

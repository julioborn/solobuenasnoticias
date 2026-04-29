export interface RssSource {
  name: string
  url: string
  language: 'es' | 'es-AR'
}

// Argentine news sources with public RSS feeds
export const RSS_SOURCES: RssSource[] = [
  // Télam - Official Argentine news agency
  { name: 'Télam', url: 'https://www.telam.com.ar/rss/secciones/38-deportes.xml', language: 'es-AR' },
  { name: 'Télam', url: 'https://www.telam.com.ar/rss/secciones/39-cultura.xml', language: 'es-AR' },
  { name: 'Télam', url: 'https://www.telam.com.ar/rss/secciones/42-sociedad.xml', language: 'es-AR' },
  { name: 'Télam', url: 'https://www.telam.com.ar/rss/secciones/56-ciencia.xml', language: 'es-AR' },

  // La Nación
  { name: 'La Nación', url: 'https://feeds.lanacion.com.ar/rss/ciencia-salud', language: 'es-AR' },
  { name: 'La Nación', url: 'https://feeds.lanacion.com.ar/rss/deportes', language: 'es-AR' },
  { name: 'La Nación', url: 'https://feeds.lanacion.com.ar/rss/bienestar', language: 'es-AR' },
  { name: 'La Nación', url: 'https://feeds.lanacion.com.ar/rss/tecnologia', language: 'es-AR' },
  { name: 'La Nación', url: 'https://feeds.lanacion.com.ar/rss/espectaculos', language: 'es-AR' },

  // Infobae
  { name: 'Infobae', url: 'https://www.infobae.com/feeds/rss/ciencia/', language: 'es-AR' },
  { name: 'Infobae', url: 'https://www.infobae.com/feeds/rss/deportes/', language: 'es-AR' },
  { name: 'Infobae', url: 'https://www.infobae.com/feeds/rss/salud/', language: 'es-AR' },
  { name: 'Infobae', url: 'https://www.infobae.com/feeds/rss/tendencias/', language: 'es-AR' },

  // Clarín
  { name: 'Clarín', url: 'https://www.clarin.com/rss/deportes/', language: 'es-AR' },
  { name: 'Clarín', url: 'https://www.clarin.com/rss/sociedad/', language: 'es-AR' },
  { name: 'Clarín', url: 'https://www.clarin.com/rss/tecnologia/', language: 'es-AR' },

  // Ámbito Financiero - for positive economic news
  { name: 'Ámbito', url: 'https://www.ambito.com/rss/tecnologia.xml', language: 'es-AR' },

  // International sources (in Spanish)
  { name: 'BBC Mundo', url: 'https://feeds.bbci.co.uk/mundo/rss.xml', language: 'es' },
  { name: 'National Geographic', url: 'https://nationalgeographic.es/feed', language: 'es' },
]

import { services } from '../data/services.js';
import { projects } from '../data/projects.js';

// A plain-text summary for AI search tools (ChatGPT, Perplexity, Gemini etc.)
// See https://llmstxt.org — kept in sync with the site data automatically.
export function GET({ site }) {
  const url = (path) => new URL(path, site).href;
  const highlights = projects
    .filter((p) => !p.journal && !p.hidden)
    .map((p) => `- [${p.title}](${url(`/projects/${p.slug}/`)}): ${p.tagline}${p.year ? `, ${p.year}` : ''}`);

  const text = `# Studio Kaku

> Studio Kaku is an art consultancy and custom framing studio in Tokyo, Japan. It curates, sources, frames and installs art for private collectors, companies, galleries and hotels, working in English and Japanese.

Studio Kaku was founded by Yuki Kakuno (framing, installation and art care; founder of the framing workshop Juka Framing) and Eleanor Ford Kakuno (art consultancy, creative direction and curation). Framing is done to museum standard with archival materials, in collaboration with Juka Framing (https://www.jukaframing.com). Clients and projects include Mitsui Fudosan (Sequence hotels in Kyoto and Tokyo), Soho House, Tokyo Creative Salon at Haneda Airport, Ceysson & Bénétière, the Tokyo American Club and Tokyo Gendai.

- Location: Tokyo, Japan. Projects across Japan.
- Languages: English and Japanese (Japanese site: ${url('/ja/')})
- Contact: hello@studio-kaku.com, or the enquiry form at ${url('/contact/')}
- Instagram: https://www.instagram.com/studio.kaku

## Services

${services.map((s) => `- [${s.metaTitle.en}](${url(`/services/${s.slug}/`)}): ${s.metaDescription.en}`).join('\n')}

## Selected projects

${highlights.join('\n')}

## More

- [About Studio Kaku](${url('/about/')})
- [All services](${url('/services/')})
- [Journal of recent work](${url('/journal/')})
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

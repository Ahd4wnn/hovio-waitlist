import raw1 from '../content/posts/why-therapy-needs-ai.md?raw'
import raw2 from '../content/posts/building-hovio.md?raw'
import raw3 from '../content/posts/mental-health-in-2025.md?raw'

// Safe lightweight browser-compatible frontmatter parser
// This prevents bundler issues with node native modules (fs, path, Buffer) inside gray-matter
function parseMarkdown(raw) {
  const lines = raw.split('\n')
  if (lines[0].trim() !== '---') {
    return { data: {}, content: raw }
  }

  const data = {}
  let i = 1
  for (; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line === '---') {
      break
    }
    const colonIndex = line.indexOf(':')
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim()
      let val = line.slice(colonIndex + 1).trim()
      // strip outer quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      data[key] = val
    }
  }

  const content = lines.slice(i + 1).join('\n').trim()
  return { data, content }
}

const rawPosts = [raw1, raw2, raw3]

export function getAllPosts() {
  return rawPosts
    .map((raw) => {
      const { data, content } = parseMarkdown(raw)
      return { ...data, content }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}

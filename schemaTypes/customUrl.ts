import { defineType } from 'sanity'

export const customUrl = defineType({
  name: 'customUrl',
  title: 'URL',
  type: 'string',
  validation: (Rule) =>
    Rule.custom((url) => {
      if (!url) return true // Allow empty
      if (url === '/') return true // Allow root path

      // Check if it's a local URL (starts with /)
      if (url.startsWith('/')) return true

      // Check if it's a valid absolute URL
      try {
        new URL(url)
        return true
      } catch {
        return 'Please enter a valid URL or local path (starting with /)'
      }
    }),
})

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemaTypes'
import { structure } from './schemaTypes/structure'

export default defineConfig({
  name: 'default',
  title: 'princessential-management',

  projectId: '7rq7lzay',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Prevent creating multiple instances of singleton types
    newDocumentOptions: (prev, { creationContext }) => {
      const singletonTypes = [
        'aboutPage',
        'contactPage',
        'homePage',
        'talentPage',
      ];
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !singletonTypes.includes(templateItem.templateId));
      }
      return prev;
    },
    // Remove delete/duplicate for singletons; allow update/publish
    actions: (prev, { schemaType }) => {
      const singletonTypes = [
        'aboutPage',
        'contactPage',
        'homePage',
        'talentPage',
      ];
      if (singletonTypes.includes(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate');
      }
      return prev;
    },
  },
})

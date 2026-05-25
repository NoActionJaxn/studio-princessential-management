import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBlock',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'callToAction',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'customUrl',
            }),
          ],
        }),
        defineField({
          name: 'ghostButton',
          title: 'Ghost Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'customUrl',
            }),
          ],
        }),
        defineField({
          name: "dark",
          title: "Dark",
          type: "boolean",
          description: "Toggle dark mode for the hero section.",
        }),
      ]
    }),
    defineField({
      name: 'sponsorsTitle',
      title: 'Sponsors Title',
      type: 'string',
    }),
    defineField({
      name: 'sponsorsBlock',
      title: 'Sponsors',
      type: 'array',
      of: [
        defineField({
          name: 'sponsor',
          title: 'Sponsor',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'customUrl',
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        defineField({
          name: 'contentBlock',
          title: 'Content Block',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'color',
              options: {
                disableAlpha: true
              }
            }),
            defineField({
              name: 'callToAction',
              title: 'Call to Action',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'customUrl',
                }),
              ],
            }),
            defineField({
              name: "dark",
              title: "Dark",
              type: "boolean",
              description: "Toggle dark mode for the hero section.",
            }),
          ]
        }),
      ],
    }),
    defineField({
      name: 'carouselBlock',
      title: 'Carousel Block',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            defineField({
              name: 'imageBlock',
              title: 'Image',
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'altText',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footNoteBlock',
      title: 'Foot Note Block',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
        }),
        defineField({
          name: 'callToAction',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'customUrl',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});

import { defineType, defineField } from "sanity";

export const socialsType = defineType({
  name: 'socials',
  title: 'Socials',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'faIcon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'faIconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Brand', value: 'fa-brands' },
          { title: 'Solid', value: 'fa-solid' },
          { title: 'Regular', value: 'fa-regular' },
          { title: 'Light', value: 'fa-light' },
          { title: 'Duotone', value: 'fa-duotone' },
        ],
      },
    }),
  ],
});

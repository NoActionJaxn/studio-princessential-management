import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "targetEmail",
      title: "Target Email",
      type: "email",
      description: "The email all business inquiries will be forwarded to."
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});

import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The title that appears in the browser tab and search engine results.',
    }),
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

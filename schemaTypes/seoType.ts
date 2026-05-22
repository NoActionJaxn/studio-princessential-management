import { defineField, defineType } from "sanity";
import { StructuredDataInput } from "../components/StructuredDataInput";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
    }),
    defineField({
      name: "metaAuthor",
      title: "Meta Author",
      type: "string",
    }),
    defineField({
      name: "metaViewport",
      title: "Meta Viewport",
      type: "string",
      initialValue: "width=device-width, initial-scale=1",
    }),
    defineField({
      name: "metaCharset",
      title: "Meta Charset",
      type: "string",
      initialValue: "UTF-8",
    }),
    defineField({
      name: "metaLanguage",
      title: "Meta Language",
      type: "string",
      initialValue: "en-US",
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "metaImage",
      title: "Meta Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "metaRobots",
      title: "Meta Robots",
      type: "string",
      options: {
        list: [
          { title: "Index, Follow", value: "index, follow" },
          { title: "No Index, No Follow", value: "noindex, nofollow" },
          { title: "Index, No Follow", value: "index, nofollow" },
          { title: "No Index, Follow", value: "noindex, follow" },
        ],
        layout: "radio",
      },
      initialValue: "index, follow",
    }),
    defineField({
      name: "canonicalURL",
      title: "Canonical URL",
      type: "url",
    }),
    defineField({
      name: "structuredData",
      title: "Structured Data (JSON-LD)",
      type: "text",
      description: "Auto-generated from SEO fields. Click 'Use Generated Data' to populate.",
      components: {
        input: StructuredDataInput,
      },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Article", value: "article" },
          { title: "Profile", value: "profile" },
        ],
        layout: "radio",
      },
      initialValue: "website",
    }),
  ]
});
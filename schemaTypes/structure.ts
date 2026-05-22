import { StructureResolver } from "sanity/structure";

const singletonTypes = [
  'aboutPage',
  'contactPage',
  'homePage',
  'talentPage',
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      // Explicit singleton editors (fixed documentId prevents multiple docs)
      S.listItem()
        .id('homePage')
        .schemaType('homePage')
        .title('Home Page')
        .child(
          S.editor()
            .id('homePage')
            .schemaType('homePage')
            .documentId('homePage'),
        ),
      S.listItem()
        .id('aboutPage')
        .schemaType('aboutPage')
        .title('About Page')
        .child(
          S.editor()
            .id('aboutPage')
            .schemaType('aboutPage')
            .documentId('aboutPage'),
        ),
      S.listItem()
        .id('talentPage')
        .schemaType('talentPage')
        .title('Talent Page')
        .child(
          S.editor()
            .id('talentPage')
            .schemaType('talentPage')
            .documentId('talentPage'),
        ),
      S.listItem()
        .id('contactPage')
        .schemaType('contactPage')
        .title('Contact Page')
        .child(
          S.editor()
            .id('contactPage')
            .schemaType('contactPage')
            .documentId('contactPage'),
        ),



      // All other document types (excluding the singletons)
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId?.();
        return id ? !singletonTypes.includes(id as typeof singletonTypes[number]) : true;
      }),
    ])
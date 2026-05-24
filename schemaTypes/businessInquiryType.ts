import { defineType } from "sanity";

export const businessInquiryType = defineType({
  name: 'businessInquiry',
  title: 'Business Inquiries',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'event',
      title: 'Event',
      type: 'string',
    },
    {
      name: 'purpose',
      title: 'Purpose',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    }
  ]
});

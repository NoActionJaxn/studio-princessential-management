import 'dotenv/config'
import process from 'node:process'
import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints";

const { MAILERSEND_API_KEY, MAILERSEND_FROM_EMAIL } = process.env

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'email-business-inquiry',
      src: './functions/email-business-inquiry',
      event: {
        on: ['create'],
        filter: "_type == 'businessInquiry'",
        projection: '{_id, name, email, phone, company, event, purpose, message}',
      },
      env: {
        MAILERSEND_API_KEY,
        MAILERSEND_FROM_EMAIL,
      },
    }),
  ]
});
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '7rq7lzay',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: 'l16hndulj9wdt7qjyiyn7obq',
    autoUpdates: true,
  }
})

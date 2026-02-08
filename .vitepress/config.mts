import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "node-libgpiod",
  description: "Node bindings for Linux GPIO subsystem",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
     search: {
      provider: 'local'
    },
    nav: [
      { text: 'Documentation', link: '/docs/' }
    ],
    socialLinks: [
    { icon: 'github', link: 'https://github.com/sombriks/node-libgpiod' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/node-libgpiod' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/sombriks.com.br'}
    ],
    sidebar: [
      {
        text: 'User Guide',
        items: [
          { text: 'Overview', link: '/docs/' },
          { text: 'Tested hardware', link: '/docs/01-user-guide/tested-sbc' },
          { text: 'Environment configuration', link: '/docs/01-user-guide/environment-configuration' },
          { text: 'Chips and lines', link: '/docs/01-user-guide/chips-and-lines' },
          { text: 'Process lifecycle', link: '/docs/01-user-guide/process-lifecycle' },
          { text: 'Examples', link: '/docs/01-user-guide/examples' },
        ]
      },   
      {
        text: 'Support',
        items: [
          { text: 'FAQ', link: '/docs/04-support/faq' },
          { text: 'Community support', link: '/docs/04-support/community' },
          { text: 'Support me!', link: '/docs/04-support/support-me' },
        ]
      },
      {
        text: 'Covered API',
        items: [
          { text: 'libgpiod 1.x', link: '/docs/02-api/libgpiod-1x' },
          { text: 'libgpiod 2.x', link: '/docs/02-api/libgpiod-2x' }
        ]
      },
      {
        text: 'Developing',
        items: [
          { text: 'Changelog', link: '/docs/03-develop/CHANGELOG' },
          { text: 'DevLog', link: '/docs/03-develop/DEVELOPMENT' },
        ]
      },
    ],
  }
})

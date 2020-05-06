/* eslint-disable */
import colors from 'vuetify/es5/util/colors';

const polyfills = ['es2015'];
const polyfillsParams = encodeURIComponent(polyfills.join(','));
const polyfillUrl = `https://polyfill.io/v3/polyfill.min.js?flags=gated&features=${polyfillsParams}`;

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - RxCanvas',
    title: 'RxCanvas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'RxCanvas'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://infiniticlips.com'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'RxCanvas'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'RxCanvas Description'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }],
    script: [
      {
        src: polyfillUrl
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  styleResources: {
    scss: []
  },
  css: ['~assets/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      options: {
        customProperties: true
      },
      themes: {
        dark: {
          primary: colors.blue.base,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|rx-canvas)/
        });
      }
    }
  },
  generate: {
    subFolders: false
  },
  googleAnalytics: {
    id: ''
  }
};

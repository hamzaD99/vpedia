/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: ['Ubuntu:100,300,400,500,700,900','Roboto:100,300,400,500,700,900','Barlow+Semi+Condensed:100,300,400,500,700,900'],
    },
  })
}

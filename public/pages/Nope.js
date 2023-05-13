import render from "render"

/**
 * Options for the 404 page.
 * @typedef {object} NopeOptions
 * @property {"badID" | "badFetch" | "loadingError"} [type] - The type of 404 page to render.
 * @property {string} [prop] - An optional prop for the 404 page (e.g. the id of a product that doesn't exist)
 */

/**
 * Renders a 404 page.
 * @param {NopeOptions} [options] - The options for the 404 page.
 * @returns {void}
 * @example
 * Nope("badID", 1)
 * // => <h1>404</h1><h2>Sorry buddy, but I don't think we have a product with id #1.</h2>
 * @example
 * Nope("badFetch")
 * // => <h1>404</h1><h2>Dang, either the server is down or someone misspelled a URL. Whatever it is, it's probably Jesse's fault.</h2>
 */
export default function Nope({ type, prop } = {}) {
  document.title = "404"
  switch (type) {
    case "badID":
      render({
        component: `<h1>404</h1><h2>Sorry buddy, but I don't think we have a product with id #${prop}.</h2>`,
      })
      break
    case "badFetch":
      render({
        component: `<h1>404</h1><h2>Dang, either the server is down or someone misspelled a URL. Whatever it is, it's probably Jesse's fault. ${
          prop ? prop : ""
        }</h2>`,
      })
      break
    case "loadingError":
      render({ component: `<h1>That's Weird!</h1><h4>${prop}</h4>` })
      break
    default:
      render({
        component: `<h1>404</h1><h2>Huh, you're at ${location.pathname}, but you really shouldn't be... 🤔 </h2>`,
      })
  }
}

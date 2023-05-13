import render from "render"

/**
 * About page view template
 * @returns {void}
 */
export default function About() {
  document.title = "About"
  render({
    component: `
            <h1>About</h1>
          <p>
            This is a totally real shop that sells totally real products. It's not a
            demonstration of how client-side routing works. Noo! It's just a
            shop.
          </p>
            `,
  })
}

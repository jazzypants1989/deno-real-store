import render from "render"
import { addToast } from "toast"

/**
 * Home page view template
 * @returns {void}
 */
export default function Home() {
  document.title = "Home"
  render({
    component: () => `<h1>REAL SHOP</h1>
            <p>This is a totally real shop! See! That's a picture! Of a shop! Totally
            open.</p>
            <img src="/diana.avif" alt="Check us out" />
            `,
  })
  addToast("We are NOT a REAL shop!", { type: "error" })
}

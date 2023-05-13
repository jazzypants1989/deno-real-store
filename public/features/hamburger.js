export default function hamburger() {
  /**
   * Creates a hamburger menu for mobile devices.
   * @returns {void}
   */

  /**
   * The hamburger menu. You know, the three lines.
   * @type {HTMLElement | null}
   */
  const hamburgerMenu = document.querySelector("#hamburger")
  if (!hamburgerMenu) {
    throw new Error("Hamburger menu not found")
  }

  hamburgerMenu.addEventListener("click", () => {
    /**
     * The nav element as a whole.
     * @type {HTMLElement | null}
     */
    const nav = document.querySelector("nav")
    if (!nav) {
      throw new Error("Nav element not found")
    }
    /**
     * The nav ul element. This is the actual menu.
     * @type {HTMLElement | null}
     */
    const navUL = document.querySelector("nav ul")
    if (!navUL) {
      throw new Error("Nav ul element not found")
    }
    const screenH = window.innerHeight

    if (nav.style.display === "flex") {
      navUL.style.height = "0px"
      navUL.style.fontSize = "initial"
      setTimeout(() => {
        nav.style.display = "none"
      }, 480)
    } else {
      nav.style.display = "flex"
      setTimeout(() => {
        navUL.style.height = screenH + "px"
        navUL.style.fontSize = "2rem"
      })
    }

    globalThis.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        nav.style.display = "flex"
        navUL.style.height = "initial"
        navUL.style.fontSize = "initial"
      } else {
        nav.style.display = "none"
        navUL.style.height = "0px"
        navUL.style.fontSize = "initial"
      }
    })
  })
}

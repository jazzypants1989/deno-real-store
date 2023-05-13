/**
 * @fileoverview This file contains the theme listener for the website
 * @module
 * @exports themeListener
 */

/**
 * The toggle theme button
 * @type {HTMLButtonElement | null}
 */
const toggleTheme = document.querySelector("#toggleTheme")

/**
 * The theme that is currently set in local storage
 * @type {string | null}
 */
const themeCheck = localStorage.getItem("theme")

/**
 * Initializes the theme. If there is no theme set in localStorage, it will set the theme to dark.
 * @returns {void}
 * @example
 * themeListener()
 * // => document.body.className = "dark"
 * @example
 * localStorage.setItem("theme", "purple")
 * themeListener()
 * // => document.body.className = "purple"
 */
export default function themeListener() {
  themeCheck
    ? (document.body.className = themeCheck)
    : (document.body.className = "dark")

  /**
   * Adds an event listener to the toggle theme button. When the button is clicked, it will set the theme to the next theme in the list.
   * @returns {void}
   */
  toggleTheme?.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "dark"
    const newTheme =
      currentTheme === "dark"
        ? "purple"
        : currentTheme === "purple"
        ? "green"
        : "dark"
    localStorage.setItem("theme", newTheme)
    document.body.className = newTheme
  })
}

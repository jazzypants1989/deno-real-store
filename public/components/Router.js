import { Route } from "Routes"
import { searchHandler, search } from "search"
import { createSpinner } from "store"
import render from "render"
import Nope from "Nope"

/**
 * The main area of the page
 * @type {HTMLElement | null}
 */
export const main = document.querySelector(".main")

/**
 * The Central Router of the app
 * @param {NavigateEvent} [navigateEvent]
 * @returns {Promise<void>}
 */
export default async function Router(navigateEvent) {
  if (shouldNotIntercept(navigateEvent)) {
    console.log("shouldNotIntercept")
    return
  }

  // Get URL
  const url = navigateEvent ? navigateEvent.destination.url : location.href
  const newURL = new URL(url)
  const path = newURL.pathname

  // Close the mobile menu if it's open
  const nav = document.querySelector("nav")
  const navOpen = nav?.style.display === "flex"
  const mediaQuery = window.matchMedia("(max-width: 768px)")
  navOpen && mediaQuery.matches ? (nav.style.display = "none") : null

  // Check if the path is the same as the origin path
  if (navigateEvent && path === location.pathname) {
    navigateEvent.preventDefault()
    main?.scrollTo({ top: 0, behavior: "smooth" })
    return
  }

  // Start Spinner
  const spinner = createSpinner()
  const mainHTML = main?.innerHTML
  checkAndReplaceHTML(mainHTML, spinner, 200)

  const searchParams = new URLSearchParams(newURL.search)
  const searchValue = searchParams.get("search")

  // Check for search
  if (searchValue && search) {
    search.value = searchValue
    searchHandler()
    return
  }

  // Route
  navigateEvent
    ? navigateEvent.intercept({
        scroll: "manual",
        async handler() {
          navigateEvent.signal.onabort = () => {
            if (!main) return
            main.innerHTML = mainHTML || ""
          }

          try {
            await Route(path)
          } catch (error) {
            console.error("error", error)
            if (!main) return
            Nope({
              type: "loadingError",
              prop: "There was an error loading the module for this route. That's not good.",
            })
          }
        },
      })
    : await Route(path)
}

window.navigation.addEventListener("navigate", Router)

/**
 * Check if the main HTML is the same as the old main HTML and replace it with a spinner if it is.
 * @param {string | undefined} mainHTML
 * @param {HTMLElement} spinner
 * @param {number} time
 * @returns {void}
 */
function checkAndReplaceHTML(mainHTML, spinner, time) {
  setTimeout(() => {
    if (mainHTML === main?.innerHTML) {
      if (!main) return
      document.title = "Loading..."
      const heading = document.createElement("h1")
      heading.textContent = "Loading..."
      render({
        element: ".main",
        component: () => heading.outerHTML + spinner.outerHTML,
      })
    }
  }, time)
}

/**
 * Check if the navigation event should be intercepted.
 * @param {NavigateEvent | undefined} navigateEvent
 * @returns {string | true | FormData | null | undefined}
 */
function shouldNotIntercept(navigateEvent) {
  if (!navigateEvent) return
  return (
    !navigateEvent.canIntercept ||
    navigateEvent.hashChange ||
    navigateEvent.downloadRequest ||
    navigateEvent.formData
  )
}

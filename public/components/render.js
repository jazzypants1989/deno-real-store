import { addToCart, removeFromCart } from "cart"
import { getProducts } from "store"

/**
 * @type {(() => void)[] | undefined}
 */
let currentListeners = undefined

currentListeners = []

/**
 * Creates a reactive signal.
 * @param {any} initialValue - The initial value of the signal.
 * @returns {[() => any, (newValue: any) => void]} - A tuple containing the read and write functions.
 * @example
 * const [read, write] = createSignal(0)
 */
export function createSignal(initialValue) {
  let value = initialValue

  const subscribers = new Set()

  /**
   * Reads the current value of the signal.
   * @type {(() => any) | undefined}
   */
  const read = () => {
    if (currentListeners !== undefined) {
      currentListeners.forEach((fn) => subscribers.add(fn))
    }
    return value
  }

  /**
   * Writes a new value to the signal.
   * @type {(newValue: any) => void}
   * @param {any} newValue - The new value to set.
   * @returns {void}
   */
  const write = (newValue) => {
    if (value !== newValue) {
      value = newValue
      subscribers.forEach((fn) => fn())
    }
  }

  return [read, write]
}

/**
 * Used to run a callback function when a signal changes.
 * @param {() => void} callback - The callback function to run.
 * @returns {void}
 */
export function createEffect(callback) {
  if (!currentListeners) {
    throw new Error("createEffect must be called within a component")
  }

  currentListeners.push(callback)
  try {
    callback()
  } catch (e) {
    console.error("Error in effect", e)
  } finally {
    currentListeners.pop()
  }
}

/**
 * The options for the render function.
 * @typedef {object} RenderOptions
 * @property {string | (() => string)} component - The component to render.
 * @property {string} [element] - The element to render the component to.
 * @property {() => void} [callback] - A callback to run after the component has been rendered.
 */

/**
 * The render function-- renders the component to the active element.
 * @param {RenderOptions} options
 * @returns {void}
 * @example
 * render({
 * component: () => `<h1>Home</h1>`,
 * element: "#main",
 * callback: () => console.log("Home rendered"),
 * })
 */
export default function render({ component, element, callback }) {
  if (!element) element = ".main"
  const activeArray = document.querySelectorAll(element)
  if (!activeArray.length) {
    console.error(`No element found with selector ${element}`)
    return
  }

  addOldActiveClass()
  activeArray.forEach((activeElement) => {
    if (!activeElement) return

    transitionHelper({
      updateDOM: () =>
        createEffect(() => {
          activeElement.innerHTML = conditionalRender(component)
          activeElement.scrollTop = 0
          Array.isArray(callback)
            ? callback.forEach((fn) => fn())
            : callback && callback()
          addNewActiveClass()
        }),
    })
  })
}

/**
 * Finds all the add-to-cart buttons and adds an event listener to them.
 * @returns {Promise<void>} - A promise that resolves when the buttons have been found.
 * @async
 */
export async function buttonFinderAdd() {
  const products = await getProducts()

  /**
   * @param {Event} e
   * @returns {void}
   */
  const eventListener = (e) => {
    const target = e.target
    if (!(target instanceof HTMLButtonElement)) return
    const id = target.id
    const product = products?.find((product) => product.id === Number(id))
    if (!product) throw new Error("No product found.")
    addToCart(product)
  }

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return
    if (button.alreadyAdded) return
    button.alreadyAdded = true
    button.addEventListener("click", eventListener)
  })

  window.navigation.addEventListener("navigate", () => {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return
      button.removeEventListener("click", eventListener)
    })
  })
}

export async function buttonFinderRemove() {
  const products = await getProducts()

  //we need to define our event listener here so we can remove it later
  /**
   * @param {Event} e
   * @returns {void}
   */
  const eventListener = (e) => {
    const target = e.target
    if (!(target instanceof HTMLButtonElement)) return
    const id = target.id
    const product = products?.find((product) => product.id === Number(id))
    if (!product) throw new Error("No product found.")
    removeFromCart(product)
  }

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return
    if (button.alreadyAdded) return
    button.alreadyAdded = true
    button.addEventListener("click", eventListener)
  })

  window.navigation.addEventListener("navigate", () => {
    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return
      button.removeEventListener("click", eventListener)
    })
  })
}

/**
 * Helper function to handle view transitions
 * @param {object} options
 * @param {boolean} [options.skipTransition]
 * @param {string[]} [options.classNames]
 * @param {() => void} options.updateDOM
 * @returns {ViewTransition}
 */
export function transitionHelper({ skipTransition = false, updateDOM }) {
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM())

    return {
      ready: Promise.reject(Error("View transitions unsupported")),
      updateCallbackDone,
      finished: updateCallbackDone,
      skipTransition: () => {},
    }
  }
  const transition = document.startViewTransition(updateDOM)

  return transition
}

/** @type {boolean} */
let clickedImage = false
/** @type {HTMLImageElement | null} */
let oldImage = null

document.addEventListener("click", (e) => {
  let element = e.target
  if (
    element instanceof HTMLImageElement ||
    element instanceof HTMLHeadingElement
  ) {
    if (element instanceof HTMLHeadingElement && element.parentNode) {
      element = element.parentNode.querySelector("img")
    }
    if (element instanceof HTMLImageElement) {
      oldImage = element
      clickedImage = true
    }
  } else {
    clickedImage = false
  }
})

/**
 * Adds the activeImage class to the old image.
 * @returns {void}
 */
function addOldActiveClass() {
  if (!clickedImage || !oldImage) return
  oldImage.style.viewTransitionName = "activeImage"
}

/**
 * Adds the activeImage class to the new image.
 * @returns {void}
 */
function addNewActiveClass() {
  if (!clickedImage) return
  const newImage = document.querySelector("img")
  if (!newImage) return

  newImage.classList.add("activeImage")
  newImage.style.viewTransitionName = "activeImage"
}

/**
 * Determines whether to render a string or a function.
 * @param {string | (() => string)} component
 * @returns {string}
 */
function conditionalRender(component) {
  if (typeof component === "string") {
    return component
  } else if (typeof component === "function") {
    return component()
  }
  throw new Error("Component must be a string or a function")
}

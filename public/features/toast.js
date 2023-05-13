/**
 * The array of toasts.
 * @type {toast[]}
 */
let toasts = []
let toastCount = 0

/**
 * The toast container.
 * @type {HTMLElement | null}
 */
const toastContainer = document.querySelector("#toast-container")

/**
 * The toast object.
 * @typedef {object} toast
 * @property {string} id - The id of the toast.
 * @property {string} message - The message to display in the toast.
 * @property {toastOptions} [options] - The options for the toast.
 */

/**
 * The options for the toast.
 * @typedef {object} toastOptions
 * @property {number} [duration] - The duration of the toast in milliseconds.
 * @property {string} [type] - The type of toast to display.
 */

/**
 * Adds a toast to the page.
 * @param {string} message - The message to display in the toast.
 * @param {toastOptions} [options] - The options for the toast.
 * @returns {string} - The id of the toast.
 */

export function addToast(message, options) {
  const id = `toast-${toastCount++}`
  const newToast = {
    id,
    message,
    options,
  }
  toasts.push(newToast)

  const duration = options?.duration ?? 3000

  setTimeout(() => {
    removeToast(id)
  }, duration)

  if (!toastContainer) return id

  toastContainer.appendChild(ToastComponent(newToast))

  return id
}

/**
 * Removes a toast from the page.
 * @param {string} id - The id of the toast to remove.
 * @returns {void}
 */
function removeToast(id) {
  const toast = document.querySelector(`#${id}`)
  if (!toast || !(toast instanceof HTMLElement)) return
  toast.classList.add("toast-out")
  toast.addEventListener("animationend", () => {
    toasts = toasts.filter((thisToast) => thisToast.id !== id)
    toast.remove()
  })
}

/**
 * The toast component.
 * @param {toast} toast - The toast object.
 * @returns {HTMLElement} - The toast element.
 */
function ToastComponent({ id, message, options }) {
  // Create a div and set the class, id, and aria attributes
  const toast = document.createElement("div")
  const type = options?.type
  toast.classList.add("toast")
  toast.id = id
  type && toast.classList.add(type)
  toast.setAttribute("role", "alert")
  toast.setAttribute("aria-live", "assertive")
  toast.setAttribute("aria-atomic", "true")

  // Set the innerHTML of the toast
  toast.innerHTML = `
    <div class="toast-header">
        ${type === "success" ? "Hooray!" : "Aww, shucks!"}
    </div>
    <div class="toast-body">
        ${message}
    </div>
    `

  // Create a close button, add the event listener, and add it to the toast
  const closeBtn = document.createElement("button")
  closeBtn.textContent = "X"
  closeBtn.addEventListener("click", () => {
    removeToast(id)
  })
  toast.appendChild(closeBtn)
  return toast
}

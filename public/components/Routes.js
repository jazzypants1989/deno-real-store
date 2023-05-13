import Nope from "Nope"

const Routes = [
  { path: "/", component: "Home" },
  { path: "/about", component: "About" },
  { path: "/products", component: "Products" },
  { path: "/product", component: "ProductPage", dynamic: true },
  { path: "/cart", component: "Cart" },
  { path: "/checkout", component: "Checkout" },
  { path: "/success", component: "Success" },
  { path: "/events", component: "Events" },
]

/**
 * @param {string} path - The path to the component.
 * @returns {Promise<string>} - The component.
 * @async
 */

export async function Route(path) {
  const route = Routes.find(
    (route) => route.path.split("/")[1] === path.split("/")[1]
  )
  if (!route) {
    Nope()
    return ""
  }

  try {
    const component = await import(`/pages/${route.component}.js`)

    if (route.dynamic) {
      const id = path.split("/")[path.split("/").length - 1]
      return component.default(id)
    }
    return component.default()
  } catch (error) {
    console.error(error)
    Nope({
      type: "loadingError",
      prop: `Error loading ${route.component}.js. Either you're offline or someone messed up the code.`,
    })
    return ""
  }
}

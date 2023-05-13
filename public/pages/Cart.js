import { getProducts } from "store"
import render, { buttonFinderRemove, createEffect } from "render"
import * as _Types from "Types"
import { cart } from "cart"

/**
 * Cart page view template
 * @returns {Promise<void>}
 */
export default async function Cart() {
  /**
   * @type {_Types.Cart}
   */
  document.title = "Cart"
  const products = await getProducts()
  const emptyTemplate = `
    <h1>Cart</h1>
    <p>Your cart is empty. Go buy some weird stuff!</p>
    `
  createEffect(() => {
    if (location.pathname !== "/cart") return
    const cartItems = Object.keys(cart()).map((id) => {
      const product = products?.find((product) => product.id === Number(id))

      if (!product || cart()[Number(id)].quantity < 1) {
        return ""
      }

      return `
            <div class="product">
            <a href="/product/${product?.id}">
              <img src="${product?.thumbnail}" alt="${product?.title}" />
              <h2>${product?.title}</h2>
            </a>
              <p>$${product?.price}</p>
              <p>Quantity: ${cart()[Number(id)].quantity}</p>
              <button class="remove-from-cart" id="${
                product?.id
              }">Remove from cart</button>
            </div>
            `
    })

    if (cartItems.length === 0 || cartItems.join("") === "") {
      render({ component: emptyTemplate })
    } else {
      render({
        component: `<h1>Cart</h1>
          ${cartItems.join("")}`,
        callback: buttonFinderRemove,
      })
    }
  })
}

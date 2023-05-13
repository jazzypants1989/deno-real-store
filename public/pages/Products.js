import ProductComponent from "Product"
import render, { buttonFinderAdd } from "render"
import { getProducts } from "store"
import Nope from "Nope"

/**
 * Products page view template
 * @returns {Promise<void>}
 * @async
 */
export default async function ProductsPage() {
  const products = await getProducts()
  if (!products) {
    Nope({
      type: "badFetch",
      prop: "Someone messed up the database!! Yeah, that's it...",
    })
    return
  }
  document.title = "Products"
  const productsHTML = Object.values(products)
    .map((product) => ProductComponent(product))
    .join("")
  render({
    component: `<h1>Products</h1>
    <div class="products">${productsHTML}</div>
  `,
    callback: buttonFinderAdd,
  })
}

import Nope from "Nope"
import ProductComponent from "Product"
import { getProduct } from "store"
import render, { buttonFinderAdd } from "render"

/**
 * The Product Page for a specific product.
 * @param {string} id - The id of the product.
 * @returns {Promise<void>} - The HTML template for the product page.
 * @async
 */
export default async function ProductPage(id) {
  const product = await getProduct(Number(id))
  const search = document.querySelector("#search")
  if (!product) {
    Nope({ type: "badID", prop: id })
    return
  }
  if (!search || !(search instanceof HTMLInputElement)) {
    throw new Error("Search bar not found")
  }
  document.title = product.title
  search.value = product.title
  product
    ? render({
        component: `<h1>${product.title}</h1>
                    ${ProductComponent(product)}`,
        callback: buttonFinderAdd,
      })
    : Nope({ type: "badID", prop: id })
  return
}

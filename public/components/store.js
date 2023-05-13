import Nope from "Nope"
// import * as _Types from "Types"

// /**
//  * The products array.
//  * @type {_Types.Product[]}
//  */
// let products = []

/**
 * The products array.
 * @type {Product[] | undefined}
 */
let products = []

/**
 * Fetches an object which contains the products array from the database.
 * @returns {Promise<RawData | Undefined>} The object which contains the products array.
 */

const db = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products")

    if (!response.ok) {
      alert("HTTP-Error: " + response.status)
      console.error(response)
      Nope({ type: "badFetch", prop: response.status.toString() })
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
    Nope({ type: "badFetch", prop: error })
  }
}

/**
 * Fetches the products from the database.
 * @returns {Promise<Product[] | Undefined>} The products.
 */

export async function getProducts() {
  try {
    const cacheTimeLimit = 1000 * 60 * 10 // 10 minutes
    const now = Date.now()
    const cacheTimeStamp = localStorage.getItem("Cache Timestamp")
    // So, if the timestamp exists and is less than 10 minutes old, we'll use the cache
    if (cacheTimeStamp && now - Number(cacheTimeStamp) < cacheTimeLimit) {
      products = JSON.parse(localStorage.getItem("products") || "[]")
      console.trace("cache is still good, loading from cache")
      return products
    }
    console.trace("cache is empty or expired, loading from server")
    const data = await db()
    if (data) {
      products = data.products
      localStorage.setItem("products", JSON.stringify(products))
      localStorage.setItem("Cache Timestamp", now.toString())
      return products
    }
    Nope({ type: "badFetch", prop: "no data" })
  } catch (error) {
    console.error(error)
    Nope({ type: "badFetch", prop: error })
  }
}

/**
 * Fetches a product from the database.
 * @param {number} id - The id of the product to fetch.
 * @returns {Promise<Product | Undefined>} The product.
 */
export async function getProduct(id) {
  products = await getProducts()
  if (!products) {
    Nope({ type: "badFetch", prop: "no products" })
    return
  }
  return products.find((product) => product.id === Number(id))
}

export function createSpinner() {
  const spinner = document.createElement("div")
  spinner.classList.add("spinner")
  return spinner
}

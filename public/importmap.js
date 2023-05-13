const im = document.createElement("script")
im.type = "importmap"
im.textContent = JSON.stringify({
  "imports": {
    "stripe-js":
      "https://unpkg.com/@stripe/stripe-js@1.52.1/dist/stripe.esm.js",
    "date-fns": "https://unpkg.com/date-fns@2.27.0/esm/index.js",
    "@fullcalendar/core": "https://cdn.skypack.dev/@fullcalendar/core@6.1.6",
    "@fullcalendar/daygrid":
      "https://cdn.skypack.dev/@fullcalendar/daygrid@6.1.6",
    "Product": "/components/Product.js",
    "render": "/components/render.js",
    "Router": "/components/Router.js",
    "Routes": "/components/Routes.js",
    "store": "/components/store.js",
    "cart": "/features/cart.js",
    "toast": "/features/toast.js",
    "search": "/features/search.js",
    "hamburger": "/features/hamburger.js",
    "calendar": "/features/calendar.js",
    "theme": "/features/theme.js",
    "About": "/pages/About.js",
    "Cart": "/pages/Cart.js",
    "Checkout": "/pages/Checkout.js",
    "Success": "/pages/Success.js",
    "Home": "/pages/Home.js",
    "Nope": "/pages/Nope.js",
    "ProductPage": "/pages/ProductPage.js",
    "Products": "/pages/Products.js",
    "Types": "/types.js",
  },
})

document?.currentScript?.after(im)

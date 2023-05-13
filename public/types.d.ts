// Type definitions for non-npm package dom-navigation-browser 1.0
// Project: https://wicg.github.io/navigation-api
// Definitions by: Thomas Wilkinson <https://github.com/tbondwilkinson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/**
 * A Line Item for the Stripe checkout session.
 * @typedef {object} LineItem
 * @property {object} price_data - The price data for the line item.
 * @property {string} price_data.currency - The currency of the line item.
 * @property {object} price_data.product_data - The product data for the line item.
 * @property {string} price_data.product_data.name - The name of the product.
 * @property {string[]} price_data.product_data.images - The images for the product.
 * @property {number} price_data.unit_amount - The unit amount of the line item.
 * @property {number} quantity - The quantity of the line item.
 */

interface LineItem {
  price_data: {
    currency: string
    product_data: {
      name: string
      images: string[]
    }
    unit_amount: number
  }
  quantity: number
}

interface Window {
  readonly navigation: Navigation
}

interface Document {
  startViewTransition(
    updateCallback: () => Promise<void> | void
  ): ViewTransition
}

interface HTMLButtonElement {
  alreadyAdded: boolean
}

interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition(): void
}

interface NavigationEventMap {
  navigate: NavigateEvent
  navigatesuccess: Event
  navigateerror: ErrorEvent
  currententrychange: NavigationCurrentEntryChangeEvent
}

interface NavigationResult {
  committed: Promise<NavigationHistoryEntry>
  finished: Promise<NavigationHistoryEntry>
}

declare class Navigation extends EventTarget {
  entries(): NavigationHistoryEntry[]
  readonly currentEntry: NavigationHistoryEntry | null
  updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void
  readonly transition: NavigationTransition | null

  readonly canGoBack: boolean
  readonly canGoForward: boolean

  navigate(url: string, options?: NavigationNavigateOptions): NavigationResult
  reload(options?: NavigationReloadOptions): NavigationResult

  traverseTo(key: string, options?: NavigationOptions): NavigationResult
  back(options?: NavigationOptions): NavigationResult
  forward(options?: NavigationOptions): NavigationResult

  onnavigate: ((this: Navigation, ev: NavigateEvent) => unknown) | null
  onnavigatesuccess: ((this: Navigation, ev: Event) => unknown) | null
  onnavigateerror: ((this: Navigation, ev: ErrorEvent) => unknown) | null
  oncurrententrychange:
    | ((this: Navigation, ev: NavigationCurrentEntryChangeEvent) => unknown)
    | null

  addEventListener<K extends keyof NavigationEventMap>(
    type: K,
    listener: (this: Navigation, ev: NavigationEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
  removeEventListener<K extends keyof NavigationEventMap>(
    type: K,
    listener: (this: Navigation, ev: NavigationEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void
}

declare class NavigationTransition {
  readonly navigationType: NavigationTypeString
  readonly from: NavigationHistoryEntry
  readonly finished: Promise<void>
}

interface NavigationHistoryEntryEventMap {
  dispose: Event
}

declare class NavigationHistoryEntry extends EventTarget {
  readonly key: string
  readonly id: string
  readonly url: string | null
  readonly index: number
  readonly sameDocument: boolean

  getState(): unknown

  ondispose: ((this: NavigationHistoryEntry, ev: Event) => unknown) | null

  addEventListener<K extends keyof NavigationHistoryEntryEventMap>(
    type: K,
    listener: (
      this: NavigationHistoryEntry,
      ev: NavigationHistoryEntryEventMap[K]
    ) => unknown,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void
  removeEventListener<K extends keyof NavigationHistoryEntryEventMap>(
    type: K,
    listener: (
      this: NavigationHistoryEntry,
      ev: NavigationHistoryEntryEventMap[K]
    ) => unknown,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void
}

type NavigationTypeString = "reload" | "push" | "replace" | "traverse"

interface NavigationUpdateCurrentEntryOptions {
  state: unknown
}

interface NavigationOptions {
  info?: unknown
}

interface NavigationNavigateOptions extends NavigationOptions {
  state?: unknown
  history?: "auto" | "push" | "replace"
}

interface NavigationReloadOptions extends NavigationOptions {
  state?: unknown
}

declare class NavigationCurrentEntryChangeEvent extends Event {
  constructor(type: string, eventInit?: NavigationCurrentEntryChangeEventInit)

  readonly navigationType: NavigationTypeString | null
  readonly from: NavigationHistoryEntry
}

interface NavigationCurrentEntryChangeEventInit extends EventInit {
  navigationType?: NavigationTypeString | null
  from: NavigationHistoryEntry
}

declare class NavigateEvent extends Event {
  constructor(type: string, eventInit?: NavigateEventInit)

  readonly navigationType: NavigationTypeString
  readonly canIntercept: boolean
  readonly userInitiated: boolean
  readonly hashChange: boolean
  readonly destination: NavigationDestination
  readonly signal: AbortSignal
  readonly formData: FormData | null
  readonly downloadRequest: string | null
  readonly info?: unknown

  intercept(options?: NavigationInterceptOptions): void
  scroll(): void
}

interface NavigateEventInit extends EventInit {
  navigationType?: NavigationTypeString
  canIntercept?: boolean
  userInitiated?: boolean
  hashChange?: boolean
  destination: NavigationDestination
  signal: AbortSignal
  formData?: FormData | null
  downloadRequest?: string | null
  info?: unknown
}

interface NavigationInterceptOptions {
  handler?: () => Promise<void>
  focusReset?: "after-transition" | "manual"
  scroll?: "after-transition" | "manual"
}

declare class NavigationDestination {
  readonly url: string
  readonly key: string | null
  readonly id: string | null
  readonly index: number
  readonly sameDocument: boolean

  getState(): unknown
}

interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition(): void
}

interface CSSStyleDeclaration {
  viewTransitionName: string
}

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  image: string
  category: string
  brand: string
  rating: number
  stock: number
  images: string[]
  thumbnail: string
}

interface RawData {
  products: Product[]
}

interface CartItem {
  quantity: number
  product: Product
}

interface Cart {
  [key: number]: CartItem
}

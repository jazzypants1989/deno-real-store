import Router from "Router"
import { searchListener } from "search"
import themeListener from "theme"
import updateCart from "cart"
import hamburger from "hamburger"

updateCart()

themeListener()

searchListener()

hamburger()

Router()

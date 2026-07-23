import { redirect } from 'next/navigation'

/**
 * Temporary: the products index isn't built yet.
 * Until it is, /products sends visitors straight to the Sanctuary Suite page
 * so the nav CTA never 404s. Replace this with the full product listing later.
 */
export default function ProductsIndex() {
  redirect('/products/sanctuary-suite')
}

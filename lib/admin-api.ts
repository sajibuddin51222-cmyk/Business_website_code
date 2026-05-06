/** Browser-only helpers for authenticated admin API calls */
export function adminFetch(input: RequestInfo | URL, init?: RequestInit) {
  const headers = new Headers(init?.headers)
  if (!headers.has("Content-Type") && init?.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }
  return fetch(input, {
    ...init,
    credentials: "include",
    headers,
  })
}

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Parse fetch Response as JSON; handles empty bodies and HTML error pages */
export async function parseJsonResponse<T>(response: Response, fallback: T): Promise<T> {
  const text = await response.text()
  if (!text?.trim()) return fallback
  try {
    return JSON.parse(text) as T
  } catch {
    return fallback
  }
}

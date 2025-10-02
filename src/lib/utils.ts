import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMediaUrl(path: string) {
  const base = 'https://kalev-media-files.s3.eu-west-2.amazonaws.com'
  return `${base}${path}`
}
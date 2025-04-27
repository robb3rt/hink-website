import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a cached avatar URL for a given email using the Liara avatar service
 * @param email The user's email address
 * @returns A URL for the user's avatar
 */
export function getAvatarUrl(email: string): string {
  // Create a more unique hash from the email
  const uniqueHash = email
    // Split email into parts and reverse them
    .split('@')
    .reverse()
    .join('.')
    // Add some salt to make it harder to guess
    .concat('.$hink$')
    // Convert to base64
    .split('')
    .map(char => char.charCodeAt(0))
    .join('.')
    // Convert to base64 and clean up special chars
    .toString();
  
  // Create final hash that's URL safe
  const hashedEmail = btoa(uniqueHash)
    .replace(/[+/=]/g, '') // Remove base64 special chars
    .slice(0, 32); // Limit length for consistency
  
  // Return the avatar URL with the hashed email
  return `https://avatar.iran.liara.run/public?username=${hashedEmail}`;
} 
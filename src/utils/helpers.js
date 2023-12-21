/**
 * @file helpers.js
 * Collection of utility functions for common string manipulations.
 * Includes functions for capitalising letters and formatting strings.
 * Useful for preparing data for display in the UI.
 */

// Helper function to capitalise the first letter of a string.
export const capitaliseFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Helper function to format strings, replacing hyphens with spaces and capitalising words.
export const formatString = string => {
  return string.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}

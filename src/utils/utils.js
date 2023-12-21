export const capitaliseFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const formatString = string => {
  return string.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}

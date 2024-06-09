export const validateSvg = (file) => {
  if (file) {
    const fileName = file.name

    const parts = fileName.split(".")

    const fileExtension = parts[parts.length - 1]

    const lowercaseExtension = fileExtension.toLowerCase()

    if (lowercaseExtension === "svg") return true

    return false
  }
  return false
}

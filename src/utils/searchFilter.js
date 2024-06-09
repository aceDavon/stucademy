export function handleFilter(arr, query, type = null) {
  if (type === null) {
    if (!query || query === "all") {
      return arr
    } else {
      const result = arr.filter((element) => {
        return Object.values(element).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        )
      })
      return result
    }
  } else {
    const result = arr.filter((element) => {
      if (query === "active") {
        return Object.keys(element).some((key) => {
          return key === "status" && element[key] === "1"
        })
      } else if (query === "inactive") {
        return Object.keys(element).some((key) => {
          return key === "status" && element[key] === "0"
        })
      } else {
        return element
      }
    })
    return result
  }
}

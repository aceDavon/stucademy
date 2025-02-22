import React from "react"

const RoundedRectangularIcon = ({
  height = 24,
  width = 24,
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill={fill}
      {...props}
    >
      <path
        d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
        fill="none"
      />
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h16v12H4z" />
    </svg>
  )
}

export default RoundedRectangularIcon

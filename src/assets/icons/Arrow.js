import * as React from "react"

const Arrow = ({ size = 24, color = '#737db2', rotateAngle = 0 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className='rotatable'
    transform={`rotate(${rotateAngle})`}
  >
      <path d="M9 18l6-6-6-6"/>
  </svg>
)

export default Arrow;

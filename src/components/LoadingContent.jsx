import React from "react"

const LoadingContent = ({ loading, height, children }) => {
  return loading ? (
    <div
      style={{
        height: height || "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <i className="im im-spinner rotating app-btn" />
    </div>
  ) : (
    children
  )
}

export default LoadingContent

import React, { useState } from "react"
import axios from "axios"

const Login = (props) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    await axios
      .post("https://protected-retreat-04756.herokuapp.com/users/verify", user)
      .then((res) => {
        props.logUser(res.data)
      })
      .catch((err) => {
        setError("incorrect mail/password")
      })
      .finally(() => setLoading(false))
  }
  return (
    <div style={{ opacity: props.toggleState ? 1 : 0 }} className="auth-panel">
      <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
        <input
          name="email"
          className="auth-input"
          type="email"
          placeholder="enter mail"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          className="auth-input"
          type="password"
          placeholder="enter password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button disabled={loading} type="submit" className="btn app-btn">
          {loading ? (
            <i className="im im-spinner rotating" />
          ) : (
            <i className="im im-check-mark" />
          )}
        </button>
        <div className="auth-msg">
          <p>{error}</p>
          <button
            type="button"
            onClick={props.showRegister}
            style={{ fontSize: "1rem" }}
            className="btn app-btn"
          >
            new? sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login

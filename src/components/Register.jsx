import React, { useState } from "react"
import axios from "axios"

const Register = (props) => {
  const [loading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewUser((prevValue) => {
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
      .post("https://protected-retreat-04756.herokuapp.com/users/add", newUser)
      .then((res) => {
        props.logUser(res.data)
      })
      .catch((err) => {
        setError("email exists already")
      })
      .finally(() => setLoading(false))
  }
  return (
    <div style={{ opacity: props.toggleState ? 0 : 1 }} className="auth-panel">
      <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
        <input
          name="name"
          className="auth-input"
          placeholder="enter name"
          value={newUser.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className="auth-input"
          type="email"
          placeholder="enter mail"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="auth-input"
          type="password"
          placeholder="enter password"
          value={newUser.password}
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
            onClick={props.showLogin}
            style={{ fontSize: "1rem" }}
            className="btn app-btn"
          >
            already signed up? sign in
          </button>
          <p>
            Note: This site is still in development. Users are advised to
            provide fake emails and passwords to avoid security issues
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register

import React, { useState } from "react"
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import autosize from "autosize"

function EntryForm(props) {
  const [loading, setLoading] = useState(false)
  function handleTitleChange(event) {
    const { name, value } = event.target
    props.setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  function handleContentChange(event) {
    const { name, value } = event.target
    props.setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  const toggleSpecial = () => {
    props.setEntry((prevValue) => {
      return {
        ...prevValue,
        isSpecial: !prevValue.isSpecial,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    await axios.post(
      "https://protected-retreat-04756.herokuapp.com/entries/add",
      props.entry
    )

    await props.update(props.entry.user_id)
    setLoading(false)
    props.reset()
  }

  autosize(document.getElementById("ta"))

  return (
    <form onSubmit={handleSubmit}>
      <div className="entry-menu">
        <div className="entry-sub-menu">
          <Link to="/settings">
            <button className="btn" type="button">
              <i className="im im-gear app-btn"></i>
            </button>
          </Link>
        </div>
        <div className="entry-sub-menu">
          <button onClick={toggleSpecial} className="btn" type="button">
            <i
              style={{
                color: props.entry.isSpecial
                  ? "yellow"
                  : "rgba(255, 255, 255, 0.3)",
              }}
              className="im im-star special-btn"
            ></i>
          </button>

          <button disabled={loading} className="btn" type="submit">
            {loading ? (
              <i className="im im-spinner rotating app-btn" />
            ) : (
              <i className="im im-check-mark app-btn" />
            )}
          </button>
        </div>
      </div>
      <input
        className="entry-field"
        type="text"
        name="title"
        value={props.entry.title}
        onChange={handleTitleChange}
        placeholder="Title the day"
        autoComplete="off"
        required
      />
      <DatePicker
        className="date-picker"
        selected={props.entry.date}
        onChange={(date) =>
          props.setEntry((prevValue) => {
            return {
              ...prevValue,
              date: date,
            }
          })
        }
        dateFormat="MMMM d, yyyy"
      />
      <textarea
        id="ta"
        className="entry-textarea"
        name="content"
        value={props.entry.content}
        onChange={handleContentChange}
        rows="1"
        placeholder="So, what happened?"
        required
      />
    </form>
  )
}

export default EntryForm

import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import autosize from "autosize"
import LoadingContent from "./LoadingContent"

function EditEntry({ id, update }) {
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [isEdited, setEdited] = useState(false)
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    date: new Date(),
    isSpecial: false,
  })

  useEffect(() => {
    fetchItem(id)
  }, [id])

  const fetchItem = async (id) => {
    setLoading1(true)
    const res = await axios.get(
      "https://protected-retreat-04756.herokuapp.com/entries/" + id
    )
    setEntry(res.data)
    setLoading1(false)
  }

  function handleTitleChange(event) {
    const { name, value } = event.target
    setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  function handleContentChange(event) {
    const { name, value } = event.target
    setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  const toggleSpecial = () => {
    setEntry((prevValue) => {
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
      "https://protected-retreat-04756.herokuapp.com/entries/update/" + id,
      entry
    )

    await update(entry.user_id)
    setLoading(false)
    setEdited(true)
  }

  autosize(document.getElementById("ta"))

  return isEdited ? (
    <Redirect to={"/entries/" + id} />
  ) : (
    <LoadingContent loading={loading1}>
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
                  color: entry.isSpecial
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
          value={entry.title}
          onChange={handleTitleChange}
          placeholder="Title"
          autoComplete="off"
          required
        />
        <DatePicker
          className="date-picker"
          selected={new Date(entry.date)}
          onChange={(date) =>
            setEntry((prevValue) => {
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
          value={entry.content}
          onChange={handleContentChange}
          placeholder="Start writing"
          required
        />
      </form>
    </LoadingContent>
  )
}

export default EditEntry

import React from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import autosize from "autosize";

function EntryForm(props) {
  function handleTitleChange(event) {
    const { name, value } = event.target;
    props.setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleContentChange(event) {
    const { name, value } = event.target;
    props.setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const toggleSpecial = () => {
    props.setEntry((prevValue) => {
      return {
        ...prevValue,
        isSpecial: !prevValue.isSpecial,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:5000/entries/add", props.entry);

    await props.update(props.entry.user_id);
    props.reset();
  };

  autosize(document.getElementById("ta"));

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

          <button className="btn" type="submit">
            <i className="im im-check-mark app-btn"></i>
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
            };
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
  );
}

export default EntryForm;

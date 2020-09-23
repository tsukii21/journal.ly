import React from "react";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const entry = {
      title: props.entry.title,
      content: props.entry.content,
      date: props.entry.date,
    };

    await axios.post("http://localhost:5000/entries/add", entry);

    props.update();
    props.reset();
  };

  autosize(document.getElementById("ta"));

  return (
    <form onSubmit={handleSubmit}>
      <div className="entry-menu">
        <button className="btn" type="submit">
          <i className="im im-check-mark app-btn"></i>
        </button>
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

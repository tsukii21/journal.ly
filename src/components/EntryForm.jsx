import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

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

    await axios
      .post("http://localhost:5000/entries/add", entry)
      .then((res) => console.log(res));

    props.update();
    props.reset();
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
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
      <input
        className="entry-field"
        type="text"
        name="title"
        value={props.entry.title}
        onChange={handleTitleChange}
        placeholder="Title"
        autoComplete="off"
        required
      />
      <textarea
        className="entry-textarea"
        name="content"
        value={props.entry.content}
        onChange={handleContentChange}
        placeholder="Start writing"
        required
      />
      <button className="btn entry-submit-btn" type="submit">
        <SaveAltIcon fontSize="large" />
      </button>
    </form>
  );
}

export default EntryForm;

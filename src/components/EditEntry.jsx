import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import autosize from "autosize";

function EditEntry({ id, update }) {
  const [isEdited, setEdited] = useState(false);
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    date: new Date(),
    isSpecial: false,
  });

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  const fetchItem = async (id) => {
    const res = await axios.get("http://localhost:5000/entries/" + id);
    setEntry(res.data);
  };

  function handleTitleChange(event) {
    const { name, value } = event.target;
    setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleContentChange(event) {
    const { name, value } = event.target;
    setEntry((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const toggleSpecial = () => {
    setEntry((prevValue) => {
      return {
        ...prevValue,
        isSpecial: !prevValue.isSpecial,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:5000/entries/update/" + id, entry);

    update();
    setEdited(true);
  };

  autosize(document.getElementById("ta"));

  return isEdited ? (
    <Redirect to={"/entries/" + id} />
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="entry-menu">
        <button onClick={toggleSpecial} className="btn" type="button">
          <i
            style={{
              color: entry.isSpecial ? "yellow" : "rgba(255, 255, 255, 0.3)",
            }}
            className="im im-star special-btn"
          ></i>
        </button>
        <button className="btn" type="submit">
          <i className="im im-check-mark app-btn"></i>
        </button>
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
            };
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
  );
}

export default EditEntry;

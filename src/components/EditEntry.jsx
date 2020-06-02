import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

function EditEntry({ id, update }) {
  const [isEdited, setEdited] = useState(false);
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    date: new Date(),
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/entries/update/" + id, entry)
      .then((res) => console.log(res));

    update();
    setEdited(true);
  };

  return isEdited ? (
    <Redirect to={"/entries/" + id} />
  ) : (
    <form className="entry-form" onSubmit={handleSubmit}>
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
      <textarea
        className="entry-textarea"
        name="content"
        value={entry.content}
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

export default EditEntry;

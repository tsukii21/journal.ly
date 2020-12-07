import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function DeleteEntry({ id, update, loggedUser }) {
  const [deleted, setDeleted] = useState(false);
  const [notDeleted, setNotDeleted] = useState(false);
  const deleteItem = async () => {
    await axios.delete(
      "https://protected-retreat-04756.herokuapp.com/entries/" + id
    );
    await update(loggedUser._id);
    setDeleted(true);
  };
  const cancelDelete = () => {
    setDeleted(true);
    setNotDeleted(true);
  };
  return deleted ? (
    notDeleted ? (
      <Redirect to={"/entries/" + id} />
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <div className="delete-entry">
      <h2>Are you sure you want to delete this entry?</h2>
      <div className="choice-buttons">
        <button id="delete-btn" onClick={deleteItem} className="btn app-btn">
          Yeah, go on
        </button>
        <button onClick={cancelDelete} className="btn app-btn">
          No, go back
        </button>
      </div>
    </div>
  );
}

export default DeleteEntry;

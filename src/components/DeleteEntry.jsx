import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function DeleteEntry({ id, update }) {
  const [deleted, setDeleted] = useState(null);
  const [notDeleted, setNotDeleted] = useState(false);
  const deleteItem = async () => {
    await axios.delete("http://localhost:5000/entries/" + id);
    update();
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

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function DeleteEntry({ id, update }) {
  const [deleted, setDeleted] = useState(null);
  const [notDeleted, setNotDeleted] = useState(false);
  const deleteItem = async () => {
    await axios
      .delete("http://localhost:5000/entries/" + id)
      .then((res) => console.log(res));
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
      <button onClick={deleteItem} className="btn btn-danger btn-large">
        YES
      </button>
      <button onClick={cancelDelete} className="btn btn-primary btn-large">
        NO
      </button>
    </div>
  );
}

export default DeleteEntry;

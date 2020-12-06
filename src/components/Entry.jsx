import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

function Entry({ match }) {
  const id = match.params.id;
  const [entry, setEntry] = useState({});

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  const fetchItem = async (id) => {
    const res = await axios.get("http://localhost:5000/entries/" + id);
    setEntry(res.data);
  };

  return (
    <div>
      <div className="entry-menu">
        <div className="entry-sub-menu">
          <Link to="/settings">
            <button className="btn" type="button">
              <i className="im im-gear app-btn"></i>
            </button>
          </Link>
        </div>
        <div className="entry-sub-menu">
          <button className="btn">
            <i
              style={{
                color: entry.isSpecial ? "yellow" : "rgba(255, 255, 255, 0.3)",
              }}
              className="im im-star special-btn"
            ></i>
          </button>
          <button className="btn">
            <Link to={"/edit/" + entry._id}>
              <i className="im im-pencil app-btn"></i>
            </Link>
          </button>
          <button className="btn">
            <Link to={"/delete/" + entry._id}>
              <i className="im im-x-mark app-btn"></i>
            </Link>
          </button>
          <button className="btn">
            <Link to="/">
              <i className="im im-plus app-btn"></i>
            </Link>
          </button>
        </div>
      </div>
      <h1 className="entry-title">{entry.title}</h1>
      <p className="entry-date">{moment(entry.date).format("MMMM D, YYYY")}</p>

      <p className="entry-content">{entry.content}</p>
    </div>
  );
}

export default Entry;

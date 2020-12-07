import React from "react";
import { Link } from "react-router-dom";

const Settings = (props) => {
  return (
    <div className="settings">
      <div className="entry-menu">
        <div className="entry-sub-menu">
          <Link to="/">
            <button className="btn" type="button">
              <i className="im im-x-mark app-btn"></i>
            </button>
          </Link>
        </div>
      </div>
      <h1>settings</h1>
      <h2>
        {props.loggedUser.name}
        <span style={{ color: "rgba(255,255,255,0.3)" }}>'s journal</span>
      </h2>

      <button
        onClick={props.logOut}
        style={{ position: "absolute", bottom: "10vh" }}
        className="btn app-btn"
      >
        Log Out
      </button>
      <p style={{ position: "absolute", bottom: "20px" }}>
        made by tsukii webworks/Jaidev Das
      </p>
    </div>
  );
};

export default Settings;

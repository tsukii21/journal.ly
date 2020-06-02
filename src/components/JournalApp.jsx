import React, { useState } from "react";
import App from "./App";

function JournalApp() {
  const [isAuthorised, setAuthorised] = useState(false);

  function handleChange(event) {
    if (event.target.value === "React21") {
      authorise();
    }
  }

  function authorise() {
    setAuthorised(true);
  }

  function logout() {
    setAuthorised(false);
  }
  return isAuthorised ? (
    <App logout={logout} />
  ) : (
    <div className="landing">
      <div className="brand">
        <h1>
          journal<span>.ly</span>
        </h1>
      </div>

      <input
        onChange={handleChange}
        className="entry-field"
        type="password"
        placeholder="enter password"
      />
    </div>
  );
}

export default JournalApp;

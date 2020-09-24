import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import EntryList from "./EntryList";
import EntryArea from "./EntryArea";

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setEntry] = useState({
    title: "",
    content: "",
    date: new Date(),
    isSpecial: false,
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:5000/entries");
    const fetchedEntries = res.data
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setEntries(fetchedEntries);
  };

  function resetForm() {
    setEntry({
      title: "",
      content: "",
      date: new Date(),
      isSpecial: false,
    });
  }

  return (
    <Router>
      <div className="app-container">
        {/* <div className="overlay">
          <div class="left-overlay"></div>
          <div class="right-overlay"></div>
        </div> */}
        <EntryArea
          reset={resetForm}
          update={fetchEntries}
          entry={newEntry}
          setEntry={setEntry}
        />
        <EntryList entries={entries} />
      </div>
    </Router>
  );
}

export default App;

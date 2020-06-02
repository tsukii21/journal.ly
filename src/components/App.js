import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import NavMenu from "./NavMenu";
import EntryList from "./EntryList";
import EntryArea from "./EntryArea";

function App(props) {
  const [expanded, setExpanded] = useState(false);
  const [entries, setEntries] = useState([]);
  const [newEntry, setEntry] = useState({
    title: "",
    content: "",
    date: new Date(),
  });

  function expand() {
    setExpanded((prevValue) => !prevValue);
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:5000/entries");
    const fetchedEntries = res.data
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setEntries(fetchedEntries);
    console.log(fetchedEntries);
  };

  function resetForm() {
    setEntry({
      title: "",
      content: "",
      date: new Date(),
    });
  }

  return (
    <Router>
      <div className="row">
        <NavMenu
          expanded={expanded}
          expand={expand}
          reset={resetForm}
          logout={props.logout}
        />
        <EntryList entries={entries} />
        <EntryArea
          reset={resetForm}
          update={fetchEntries}
          expanded={expanded}
          entry={newEntry}
          setEntry={setEntry}
        />
      </div>
    </Router>
  );
}

export default App;

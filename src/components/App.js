import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Journal from "./Journal";
import Landing from "./Landing";

function App() {
  const [isLogged, setLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [entries, setEntries] = useState([]);
  const [newEntry, setEntry] = useState({});

  let history = useHistory();

  const logUser = (user) => {
    setLogged(true);
    setLoggedUser(user);
    setEntry({
      user_id: user._id,
      title: "",
      content: "",
      date: new Date(),
      isSpecial: false,
    });
    fetchEntries(user._id);
    history.push("/");
  };

  const logOutUser = () => {
    setLogged(false);
    setLoggedUser({});
    history.push("/");
  };

  const fetchEntries = async (id) => {
    const res = await axios.get(`http://localhost:5000/${id}/entries`);
    const fetchedEntries = res.data
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setEntries(fetchedEntries);
  };

  function resetForm() {
    setEntry({
      user_id: loggedUser._id,
      title: "",
      content: "",
      date: new Date(),
      isSpecial: false,
    });
  }

  return isLogged ? (
    <Journal
      reset={resetForm}
      update={fetchEntries}
      entry={newEntry}
      setEntry={setEntry}
      entries={entries}
      logOut={logOutUser}
      loggedUser={loggedUser}
    />
  ) : (
    <Landing logUser={logUser} />
  );
}

export default App;

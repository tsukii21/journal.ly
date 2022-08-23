import React from "react"
import EntryList from "./EntryList"
import EntryArea from "./EntryArea"

const Journal = (props) => {
  return (
    <div className="app-container">
      <EntryArea
        reset={props.reset}
        update={props.update}
        entry={props.entry}
        setEntry={props.setEntry}
        logOut={props.logOut}
        loggedUser={props.loggedUser}
      />
      <EntryList entries={props.entries} loading={props.entriesLoading} />
    </div>
  )
}

export default Journal

import React from "react";
import { Route } from "react-router-dom";
import EntryForm from "./EntryForm";
import Entry from "./Entry";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";
import Settings from "./Settings";

function EntryArea(props) {
  return (
    <div className="entry-area">
      <Route exact path="/">
        <EntryForm
          reset={props.reset}
          update={props.update}
          entry={props.entry}
          setEntry={props.setEntry}
        />
      </Route>
      <Route
        exact
        path={`/edit/:id`}
        render={({ match }) => (
          <EditEntry update={props.update} id={match.params.id} />
        )}
      />
      <Route
        exact
        path={`/delete/:id`}
        render={({ match }) => (
          <DeleteEntry
            loggedUser={props.loggedUser}
            update={props.update}
            id={match.params.id}
          />
        )}
      />
      <Route exact path="/entries/:id" component={Entry} />
      <Route exact path="/settings">
        <Settings logOut={props.logOut} loggedUser={props.loggedUser} />
      </Route>
    </div>
  );
}

export default EntryArea;

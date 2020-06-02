import React from "react";
import { Route } from "react-router-dom";
import EntryForm from "./EntryForm";
import Entry from "./Entry";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";

function EntryArea(props) {
  return (
    <div
      className="entry-area"
      style={{ width: props.expanded ? "60%" : "69%" }}
    >
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
          <DeleteEntry update={props.update} id={match.params.id} />
        )}
      />
      <Route exact path="/entries/:id" component={Entry} />
    </div>
  );
}

export default EntryArea;

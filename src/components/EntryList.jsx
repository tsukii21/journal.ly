import React from "react";
import { Link } from "react-router-dom";
import EntryListItem from "./EntryListItem";

function EntryList(props) {
  return (
    <div className="entry-list-container">
      <div className="heading">
        <h1>All entries</h1>
        {props.entries.length > 0 ? (
          props.entries.length > 1 ? (
            <p>{props.entries.length} entries</p>
          ) : (
            <p> 1 entry</p>
          )
        ) : (
          <p>No entries</p>
        )}
      </div>

      <div>
        {props.entries.map((entry) => {
          return (
            <Link to={`/entries/${entry._id}`}>
              <EntryListItem
                key={entry._id}
                id={entry._id}
                title={entry.title}
                content={entry.content}
                date={entry.date}
                isSpecial={entry.isSpecial}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EntryList;

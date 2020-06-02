import React from "react";
import moment from "moment";

function EntryListItem(props) {
  return (
    <div className="entry-list-item">
      {props.title.length > 53 ? (
        <h2>{props.title.slice(0, 53) + "..."}</h2>
      ) : (
        <h2>{props.title}</h2>
      )}
      <p>{moment(props.date).format("MMMM D, YYYY")}</p>
    </div>
  );
}

export default EntryListItem;

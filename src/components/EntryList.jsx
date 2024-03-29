import React from "react"
import { Link } from "react-router-dom"
import EntryListItem from "./EntryListItem"
import LoadingContent from "./LoadingContent"

function EntryList(props) {
  return (
    <div className="entry-list-container">
      <div className="heading">
        <h1>
          journal<span style={{ color: "#1DB700" }}>.ly</span>
        </h1>
        {!props.loading &&
          (props.entries.length > 0 ? (
            props.entries.length > 1 ? (
              <p>{props.entries.length} entries</p>
            ) : (
              <p> 1 entry</p>
            )
          ) : (
            <p>No entries</p>
          ))}
      </div>

      <LoadingContent loading={props.loading} height="50vh">
        <div>
          {props.entries.map((entry) => {
            return (
              <Link key={entry._id} to={`/entries/${entry._id}`}>
                <EntryListItem
                  key={entry._id}
                  id={entry._id}
                  title={entry.title}
                  content={entry.content}
                  date={entry.date}
                  isSpecial={entry.isSpecial}
                />
              </Link>
            )
          })}
        </div>
      </LoadingContent>
    </div>
  )
}

export default EntryList

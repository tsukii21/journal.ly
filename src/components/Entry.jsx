import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

function Entry({ match }) {
  const id = match.params.id;
  const [entry, setEntry] = useState({});

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  const fetchItem = async (id) => {
    const res = await axios.get("http://localhost:5000/entries/" + id);
    setEntry(res.data);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="entry-container">
      <p style={{ fontSize: "1.6rem", color: "gray" }}>
        {moment(entry.date).format("MMMM D, YYYY")}
      </p>
      <h1 className="entry-field">{entry.title}</h1>
      <p>{entry.content}</p>
      <div className="entry-menu">
        <Button
          id="entry-menu-btn"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon fontSize="large" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to={"/edit/" + entry._id}>Edit</Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to={"/delete/" + entry._id}>Delete</Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Entry;

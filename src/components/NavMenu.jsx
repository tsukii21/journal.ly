import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";

function NavMenu(props) {
  function resetForm() {
    props.reset();
  }

  function logout() {
    props.logout();
  }

  return (
    <div className="nav-menu" style={{ width: props.expanded ? "15%" : "6%" }}>
      <button onClick={props.expand} className="btn nav-btn">
        <MenuIcon fontSize="large" />
      </button>
      <div className="nav-buttons">
        <Link to="/">
          <div onClick={resetForm} className="nav-button">
            <button className="btn nav-btn">
              <AddCircleIcon fontSize="large" />
            </button>
            <span>New</span>
          </div>
        </Link>
        <div onClick={logout} className="nav-button">
          <div className="nav-button">
            <button className="btn nav-btn">
              <HighlightOffIcon fontSize="large" />
            </button>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavMenu;

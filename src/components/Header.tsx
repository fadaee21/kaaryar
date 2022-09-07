import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={"editor"}>editor</Link>
        </li>
        <li>
          <Link to={"login"}>login</Link>
        </li>
        <li>
          <Link to={"admin"}>admin</Link>
        </li>
        <li>
          <Link to={"user"}>user</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

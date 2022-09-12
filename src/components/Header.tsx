import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul >
        <li>
          <Link to={"mentor"}>mentor</Link>
        </li>
        <li>
          <Link to={"ta"}>ta</Link>
        </li>
        <li>
          <Link to={"admin"}>admin</Link>
        </li>
        <li>
          <Link to={"teacher"}>teacher</Link>
        </li>
        <li>
          <Link to={"login"}>login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

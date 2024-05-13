import React from "react";
import { Link } from "react-router-dom";

import styles from "./Lobby.module.css";

function Lobby() {
  return (
    <div className={styles.container}>
      <div></div>
      <Link to="/main">
        <li>rodla</li>
      </Link>
    </div>
  );
}

export default Lobby;

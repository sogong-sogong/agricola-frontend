import React from "react";
import { Link } from "react-router-dom";

import styles from "./Lobby.module.css";

function Lobby() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>AGRICOLA</div>
      <div className={styles.body}>
        <div className={styles.roomlist}>
          <div className={styles.list}></div>
        </div>
        <div className={styles.startbtn}>
          <Link to="/main" className={styles.button}>
            <div>방만들기</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Lobby;

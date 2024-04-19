import styles from "./Main.module.css";

import Header from "../components/Header";
import ActBoard from "../components/ActBoard";
import HomeBoard from "../components/HomeBoard";
import CardBoard from "../components/CardBoard";
import LogBoard from "../components/LogBoard";

function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.leftBoard}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.gameBoard}>
          <div className={styles.actBoard}>
            <ActBoard />
          </div>
          <div className={styles.rightBoard}>
            <div className={styles.homeBoard}>
              <HomeBoard />
            </div>
            <div className={styles.cardBoard}>
              <CardBoard />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logBoard}>
        <LogBoard />
      </div>
    </div>
  );
}

export default Main;

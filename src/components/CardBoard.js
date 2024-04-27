import React from "react";
import styles from "./CardBoard.module.css";
import majorFrontImage from "../assets/cards/major/major01.png";
import subFrontImage from "../assets/cards/sub/sub01.png";
import jobFrontImage from "../assets/cards/job/job01.jpg";
import majorBackImage from "../assets/cards/major/major_back.png";
import subBackImage from "../assets/cards/sub/sub_back.png";
import jobBackImage from "../assets/cards/job/job_back.png";

function CardBoard() {
  // 사용한 주요설비카드
  const majorCard = (
    <div className={styles.card}>
      <div className={styles.majorText} style={{ position: "relative", top: "-50%", left:"5%" }}>
        주요설비
      </div>
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "0%", left: 0 }}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "10%", left: 0 }}
      />
      <img
        src={majorFrontImage}
        alt="major_front"
        style={{ position: "absolute", top: "20%", left: 0 }}
      />
    </div>
  );

  const subCard = (
    // 사용한 보조설비카드
    <div className={styles.card}>
      <div className={styles.subText} style={{ position: "relative", top: "-50%", left:"105%" }}>
        보조설비
      </div>
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "0%", left: "100%" }}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "10%", left: "100%" }}
      />
      <img
        src={subFrontImage}
        alt="sub_front"
        style={{ position: "absolute", top: "20%", left: "100%" }}
      />
    </div>
  );

  const jobCard = (
    // 사용한 직업카드
    <div className={styles.card}>
      <div className={styles.jobText} style={{ position: "relative", top: "-50%", left:"222%" }}>
        직업
      </div>
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "0%", left: "200%" }}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "10%", left: "200%" }}
      />
      <img
        src={jobFrontImage}
        alt="job_front"
        style={{ position: "absolute", top: "20%", left: "200%" }}
      />
    </div>
  );

  const cardPileText = (
      <div className={styles.majorText} style={{ position: "relative", top: "-40%", left:"-1%" }}>
        카드더미
      </div>
  );

  const majorCardBack = (
    // 미사용 주요설비카드
    <div className={styles.card}>
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "0%", left: 0 }}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "10%", left: 0 }}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "20%", left: 0 }}
      />
      <div className={styles.majorText} style={{ position: "relative", top: "130%", left:"0%" }}>
        주요설비
      </div>
    </div>
  );

  const subCardBack = (
    // 미사용 보조설비카드
    <div className={styles.card}>
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "0%", left: "100%" }}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "10%", left: "100%" }}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "20%", left: "100%" }}
      />
      <div className={styles.subBackBottomText} style={{ position: "relative", top: "130%", left:"105%" }}>
        보조설비
      </div>
    </div>
    
  );

  const jobCardBack = (
    // 미사용 직업카드
    <div className={styles.card}>
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "0%", left: "200%" }}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "10%", left: "200%" }}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "20%", left: "200%" }}
      />
      <div className={styles.jobBackText} style={{ position: "relative", top: "130%", left:"222%" }}>
        직업
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        {majorCard}
        {subCard}
        {jobCard}
      </div>
      <div className={styles.bottomSection}>
        {cardPileText}
        {majorCardBack}
        {subCardBack}
        {jobCardBack}
      </div>
    </div>
  );
}

export default CardBoard;

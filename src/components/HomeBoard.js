import React from 'react';
import styles from "./HomeBoard.module.css";
import majorFrontImage from "../assets/cards/major/major01.png";
import subFrontImage from "../assets/cards/sub/sub01.png";
import jobFrontImage from "../assets/cards/job/job01.jpg";
import majorBackImage from "../assets/cards/major/major_back.png";
import subBackImage from "../assets/cards/sub/sub_back.png";
import jobBackImage from "../assets/cards/job/job_back.png";

function HomeBoard() {
  const majorCard = (
    <div className={styles.card}>
      <span className={styles.cardText}>주요설비</span>
      <br />
      <br />
      <img src={majorBackImage} alt="major_back" style={{ position: "relative", top: "0%", left: 0 }}/>
      <img src={majorBackImage} alt="major_back" style={{ position: "absolute", top: "45%", left:0 }}/>
      <img src={majorFrontImage} alt="major_front" style={{ position: "absolute", top: "55%", left: 0}}/>
    </div>
  );

  const subCard = (
    <div className={styles.card}>
      <span className={styles.cardText}>보조설비</span>
      <br />
      <br />
      <img src={subBackImage} alt="sub_back" style={{ position: "relative", top: "0%", left: 0}} />  
      <img src={subBackImage} alt="sub_back" style={{ position: "absolute", top: "45%", left: 0}} />  
      <img src={subFrontImage} alt="sub_front" style={{ position: "absolute", top: "55%", left: 0}}/>
    </div>
  );

  const jobCard = (
    <div className={styles.card}>
      <span className={styles.cardText}>직업</span>
      <br />
      <br />
      <img src={jobBackImage} alt="job_back" style={{ position: "relative", top: "0%", left: 0}} />
      <img src={jobBackImage} alt="job_back" style={{ position: "absolute", top: "45%", left: 0}} />  
      <img src={jobFrontImage} alt="job_front" style={{ position: "absolute", top: "55%", left: 0}}/>
    </div>
  );

  const subCardBack = (
    <div className={styles.card}>
      <span className={styles.cardPileText}>카드 더미</span>
      <br />
      <br />
        <img src={subBackImage} alt="sub_back" style={{ position: "relative", top: "0%", left: 0}}/>  
        <img src={subBackImage} alt="sub_back" style={{ position: "absolute", top: "45%", left: 0}}/>  
        <img src={subBackImage} alt="sub_back" style={{ position: "absolute", top: "55%", left: 0}}/> 
    </div>
  )

  const jobCardBack = (
    <div className={styles.card}>
      <br />
      <br />
        <img src={jobBackImage} alt="job_back" style={{ position: "relative", top: "0%", left: 0}} />  
        <img src={jobBackImage} alt="job_back" style={{ position: "absolute", top: "45%", left: 0}} />  
        <img src={jobBackImage} alt="job_back" style={{ position: "absolute", top: "55%", left: 0}} />  
        </div>
);

  return (
    <div className={styles.container}>
      <div className={styles.bottomSection}>
        <div className={styles.cardContainer}>
          {majorCard}
          {subCard}
          {jobCard}
          {subCardBack}
          {jobCardBack}
        </div>
      </div>
    </div>
  );
}

export default HomeBoard;
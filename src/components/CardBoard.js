import React,{ useState } from "react";
import Modal from './Modal'; 
import styles from "./CardBoard.module.css";

import hwaroImage01 from "../assets/cards/major/hwaro01.png";
import hwaroImage02 from "../assets/cards/major/hwaro02.png";
import hwadeokImage01 from "../assets/cards/major/hwadeok01.png";
import hwadeokImage02 from "../assets/cards/major/hwadeok02.png";
import soilGamaImg from "../assets/cards/major/soil_gama.png";
import stoneGamaImg from "../assets/cards/major/stone_gama.png";
import furnitureFactoryImg from "../assets/cards/major/furniture_factory.png";
import bowlFactoryImg from "../assets/cards/major/bowl_factory.png";
import basketFactoryImg from "../assets/cards/major/basket_factory.png";
import umulImg from "../assets/cards/major/umul.png";

import bedroomImage from "../assets/cards/sub/bedroom.png";
import bucketImage from "../assets/cards/sub/bucket.jpg";
import butterMakerImage from "../assets/cards/sub/butter_maker.png";
import ceramicsImage from "../assets/cards/sub/ceramics.png";
import shelfImage from "../assets/cards/sub/shelf.png";
import boatImage from "../assets/cards/sub/boat.png";
import shovelImage from "../assets/cards/sub/shovel.png";

import bricklayerImage from "../assets/cards/job/bricklayer.jpg";
import counselorImage from "../assets/cards/job/counselor.jpg";
import cultivatorImage from "../assets/cards/job/cultivator.jpg";
import fenceGuardImage from "../assets/cards/job/fence_guard.jpg";
import gathererImage from "../assets/cards/job/gatherer.jpg";
import propertyManagerImage from "../assets/cards/job/property_manager.jpg";
import workerImage from "../assets/cards/job/worker.jpg";


import majorBackImage from "../assets/cards/major/major_back.png";
import subBackImage from "../assets/cards/sub/sub_back.png";
import jobBackImage from "../assets/cards/job/job_back.png";

function CardBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cardsToShow, setCardsToShow] = useState([]);  

  const handleCardClick = (cards) => {
    setCardsToShow(cards);
    setModalOpen(true);  };

  const majorCards = [
    hwaroImage01,
    hwaroImage02,
    hwadeokImage01,
    hwadeokImage02,
    soilGamaImg,
    stoneGamaImg,
    furnitureFactoryImg,
    bowlFactoryImg,
    basketFactoryImg,
    umulImg
  ];
  
  const subCards = [
    bedroomImage,
    bucketImage,
    boatImage,
    ceramicsImage,
    butterMakerImage,
    shelfImage,
    shovelImage
  ];

  const jobCards = [
    bricklayerImage,
    counselorImage,
    cultivatorImage,
    fenceGuardImage,
    gathererImage,
    propertyManagerImage,
    workerImage
  ];

  const majorCard = (
    <div className={styles.card}>
      <div className={styles.majorText} style={{ position: "relative", top: "-50%", left:"5%" }}>
        주요설비
      </div>
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "0%", left: 0,cursor: "pointer" }}
        onClick={() => handleCardClick(majorCards)}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "10%", left: 0,cursor: "pointer" }}
        onClick={() => handleCardClick(majorCards)}
      />
      <img
        src={hwaroImage01}
        alt="hwaroImage01"
        style={{ position: "absolute", top: "20%", left: 0, cursor: "pointer" }}
        onClick={() => handleCardClick(majorCards)}
      />
    </div>
  );

  const subCard = (
    <div className={styles.card}>
      <div className={styles.subText} style={{ position: "relative", top: "-50%", left:"105%" }}>
        보조설비
      </div>
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "0%", left: "100%" , cursor:"pointer"}}
        onClick={() => handleCardClick(subCards)}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "10%", left: "100%", cursor:"pointer"}}
        onClick={() => handleCardClick(subCards)}
      />
      <img
        src={bedroomImage}
        alt="bedroomImage"
        style={{ position: "absolute", top: "20%", left: "100%", cursor:"pointer"}}
        onClick={() => handleCardClick(subCards)}
      />
    </div>
  );

  const jobCard = (
    <div className={styles.card}>
      <div className={styles.jobText} style={{ position: "relative", top: "-50%", left:"222%" }}>
        직업
      </div>
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "0%", left: "200%", cursor:"pointer" }}
        onClick={() => handleCardClick(jobCards)}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "10%", left: "200%", cursor:"pointer" }}
        onClick={() => handleCardClick(jobCards)}
      />
      <img
        src={bricklayerImage}
        alt="bricklayerImage"
        style={{ position: "absolute", top: "20%", left: "200%", cursor:"pointer" }}
        onClick={() => handleCardClick(jobCards)}
      />
    </div>
  );

  const cardPileText = (
      <div className={styles.majorText} style={{ position: "relative", top: "-40%", left:"-1%" }}>
        카드더미
      </div>
  );

  const majorCardBack = (
    <div className={styles.card}>
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "0%", left: 0,cursor: "pointer" }}
        onClick={() => handleCardClick(majorCards)}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "10%", left: 0,cursor: "pointer" }}
        onClick={() => handleCardClick(majorCards)}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "20%", left: 0,cursor: "pointer" }}
        onClick={() => handleCardClick(majorCards)}
      />
      <div className={styles.majorText} style={{ position: "relative", top: "130%", left:"0%" }}>
        주요설비
      </div>
    </div>
  );

  const subCardBack = (
    <div className={styles.card}>
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "0%", left: "100%" , cursor:"pointer"}}
        onClick={() => handleCardClick(subCards)}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "10%", left: "100%", cursor:"pointer"}}
        onClick={() => handleCardClick(subCards)}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{ position: "absolute", top: "20%", left: "100%", cursor:"pointer"}}
        onClick={() => handleCardClick(subCards)}
      />
      <div className={styles.subBackBottomText} style={{ position: "relative", top: "130%", left:"105%" }}>
        보조설비
      </div>
    </div>
    
  );

  const jobCardBack = (
    <div className={styles.card}>
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "0%", left: "200%", cursor:"pointer" }}
        onClick={() => handleCardClick(jobCards)}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "10%", left: "200%", cursor:"pointer" }}
        onClick={() => handleCardClick(jobCards)}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{ position: "absolute", top: "20%", left: "200%", cursor:"pointer" }}
        onClick={() => handleCardClick(jobCards)}
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
      {modalOpen && (
        <Modal
          cards={cardsToShow}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default CardBoard;
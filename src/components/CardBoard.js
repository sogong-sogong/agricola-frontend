import React, { useState } from "react";
import MajorModal from "./MajorModal";
import SubModal from "./SubModal";
import JobModal from "./JobModal";
import HwaroModal from "./HwaroModal";

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

import hwaroOption01Image from "../assets/objects/hwaroOption01.jpg";
import hwaroOption02Image from "../assets/objects/hwaroOption02.jpg";
import hwaroOption03Image from "../assets/objects/hwaroOption03.jpg";
import hwaroOption04Image from "../assets/objects/hwaroOption04.jpg";
import hwaroOption05Image from "../assets/objects/hwaroOption05.jpg";

import { useResources } from "../context/ResourceContext";
import useWebSocket from "../hook/useWebSocket";
import useInquiryData from "../hook/useInquiryData";
import useSendData from "../hook/useSendData";

function CardBoard({ myID }) {
  const {
    ipAddress,
    portNum,
    updateGameResources,
    setScore,
    updateUserResources,
    stompClient,
    roomnumber,
    memberId,
    currentShowUser,
    userInfos,
    familyPosition,
    setFamilyPosition,
  } = useResources();

  const { sendCommonstorageData } = useWebSocket({
    stompClient,
    roomnumber,
    memberId,
    familyPosition,
  });

  const {
    setCageData,
    inquiryFarm,
    inquiryHouse,
    inquiryCage,
    inquiryUserStorage,
  } = useInquiryData({
    ipAddress,
    portNum,
    roomnumber,
    updateUserResources,
    updateGameResources,
    setScore,
    userInfos,
    familyPosition,
    setFamilyPosition,
  });

  const { sendUserData } = useSendData({
    ipAddress,
    portNum,
    memberId,
    inquiryFarm,
    inquiryHouse,
    setCageData,
    inquiryCage,
    updateUserResources,
  });

  const { gameResources } = useResources();

  const [modalOpen, setModalOpen] = useState(false);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [hwaroModalOpen, setHwaroModalOpen] = useState(false);
  const [selectedMajorCard, setSelectedMajorCard] = useState([]);
  const [majorCardStack, setMajorCardStack] = useState([
    hwaroImage01,
    hwaroImage02,
    hwadeokImage01,
    hwadeokImage02,
    soilGamaImg,
    stoneGamaImg,
    furnitureFactoryImg,
    bowlFactoryImg,
    basketFactoryImg,
    umulImg,
  ]);

  const [subCardStack, setSubCardStack] = useState([
    bedroomImage,
    bucketImage,
    boatImage,
    ceramicsImage,
    butterMakerImage,
    shelfImage,
    shovelImage,
  ]);

  const [jobCardStack, setJobCardStack] = useState([
    bricklayerImage,
    counselorImage,
    cultivatorImage,
    fenceGuardImage,
    gathererImage,
    propertyManagerImage,
    workerImage,
    sendUserData,
  ]);

  const [hwaroCardStack, setHwaroCardStack] = useState([
    hwaroOption01Image,
    hwaroOption02Image,
    hwaroOption03Image,
    hwaroOption04Image,
    hwaroOption05Image,
  ]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [majorCards, setMajorCards] = useState([]);
  const [subCards, setSubCards] = useState([]);
  const [jobCards, setJobCards] = useState([]);

  const handleMajorCardClick = (index) => {
    const clickedCard = majorCardStack[index];
    setMajorCards((prevMajorCards) => [...prevMajorCards, clickedCard]);
    setMajorCardStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.splice(index, 1);
      return newStack;
    });
  };

  const handleSubCardClick = (index) => {
    const clickedCard = subCardStack[index];
    setSubCards((prevSubCards) => [...prevSubCards, clickedCard]);
    setSubCardStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.splice(index, 1);
      return newStack;
    });
  };

  const handleJobCardClick = (index) => {
    const clickedCard = jobCardStack[index];
    setJobCards((prevJobCards) => [...prevJobCards, clickedCard]);
    setJobCardStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.splice(index, 1);
      return newStack;
    });
  };

  const handleEnableButtonClick = () => {
    setHwaroModalOpen(true);
    setModalOpen(false);
  };

  const handleMajorCardStackClick = () => {
    setModalOpen(true);
    setCardsToShow(majorCardStack);
  };

  const handleSubCardStackClick = () => {
    setModalOpen(true);
    setCardsToShow(subCardStack);
  };

  const handleJobCardStackClick = () => {
    setModalOpen(true);
    setCardsToShow(jobCardStack);
  };

  const handleMajorCardsClick = () => {
    setModalOpen(true);
    setCardsToShow(majorCards);
  };

  const handleHwaroModalOpen = () => {
    setHwaroModalOpen(true);
  };

  const handleSubCardsClick = () => {
    setModalOpen(true);
    setCardsToShow(subCards);
  };

  const handleJobCardsClick = () => {
    setModalOpen(true);
    setCardsToShow(jobCards);
  };

  const handleModalMajorCardClick = (cardImage) => {
    let index = majorCardStack.findIndex((card) => card === cardImage);
    handleMajorCardClick(index);
  };

  const handleModalSubCardClick = (cardImage) => {
    let index = subCardStack.findIndex((card) => card === cardImage);
    handleSubCardClick(index);
  };

  const handleModalJobCardClick = (cardImage) => {
    let index = jobCardStack.findIndex((card) => card === cardImage);
    handleJobCardClick(index);
  };

  const handleUsedModalMajorCardClick = () => {
    setHwaroModalOpen(true);
    setCardsToShow(hwaroCardStack);
  };

  const majorCard = (
    <div className={styles.card}>
      <div
        className={styles.majorText}
        style={{ position: "relative", top: "-50%", left: "5%" }}
      >
        주요설비
      </div>
      <img
        src={majorBackImage}
        alt="major_back"
        style={{
          position: "absolute",
          top: "-20%",
          left: 0,
          cursor: "pointer",
        }}
        onClick={handleMajorCardsClick}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{
          position: "absolute",
          top: "-10%",
          left: 0,
          cursor: "pointer",
        }}
        onClick={handleMajorCardsClick}
      />
      <img
        src={hwaroImage01}
        alt="hwaroImage01"
        style={{ position: "absolute", top: "0%", left: 0, cursor: "pointer" }}
        onClick={handleMajorCardsClick}
      />
    </div>
  );

  const subCard = (
    <div className={styles.card}>
      <div
        className={styles.subText}
        style={{ position: "relative", top: "-50%", left: "105%" }}
      >
        보조설비
      </div>
      <img
        src={subBackImage}
        alt="sub_back"
        style={{
          position: "absolute",
          top: "-20%",
          left: "100%",
          cursor: "pointer",
        }}
        onClick={handleSubCardsClick}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{
          position: "absolute",
          top: "-10%",
          left: "100%",
          cursor: "pointer",
        }}
        onClick={handleSubCardsClick}
      />
      <img
        src={bedroomImage}
        alt="bedroomImage"
        style={{
          position: "absolute",
          top: "0%",
          left: "100%",
          cursor: "pointer",
        }}
        onClick={handleSubCardsClick}
      />
    </div>
  );

  const jobCard = (
    <div className={styles.card}>
      <div
        className={styles.jobText}
        style={{ position: "relative", top: "-50%", left: "222%" }}
      >
        직업
      </div>
      <img
        src={jobBackImage}
        alt="job_back"
        style={{
          position: "absolute",
          top: "-20%",
          left: "200%",
          cursor: "pointer",
        }}
        onClick={handleJobCardsClick}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{
          position: "absolute",
          top: "-10%",
          left: "200%",
          cursor: "pointer",
        }}
        onClick={handleJobCardsClick}
      />
      <img
        src={bricklayerImage}
        alt="bricklayerImage"
        style={{
          position: "absolute",
          top: "0%",
          left: "200%",
          cursor: "pointer",
        }}
        onClick={handleJobCardsClick}
      />
    </div>
  );

  const cardPileText = (
    <div
      className={styles.cardPileText}
      style={{ position: "relative", top: "-40%", left: "-0%" }}
    >
      카드더미
    </div>
  );

  const majorCardBack = (
    <div className={styles.cardPile}>
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "0%", left: 0, cursor: "pointer" }}
        onClick={handleMajorCardStackClick}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "10%", left: 0, cursor: "pointer" }}
        onClick={handleMajorCardStackClick}
      />
      <img
        src={majorBackImage}
        alt="major_back"
        style={{ position: "absolute", top: "20%", left: 0, cursor: "pointer" }}
        onClick={handleMajorCardStackClick}
      />
      <div
        className={styles.majorBackText}
        style={{ position: "relative", top: "-25%", left: "0%" }}
      >
        주요설비
      </div>
    </div>
  );

  const subCardBack = (
    <div className={styles.cardPile}>
      <img
        src={subBackImage}
        alt="sub_back"
        style={{
          position: "absolute",
          top: "0%",
          left: "100%",
          cursor: "pointer",
        }}
        onClick={handleSubCardStackClick}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{
          position: "absolute",
          top: "10%",
          left: "100%",
          cursor: "pointer",
        }}
        onClick={handleSubCardStackClick}
      />
      <img
        src={subBackImage}
        alt="sub_back"
        style={{
          position: "absolute",
          top: "20%",
          left: "100%",
          cursor: "pointer",
        }}
        onClick={handleSubCardStackClick}
      />
      <div
        className={styles.subBackText}
        style={{ position: "relative", top: "-25%", left: "105%" }}
      >
        보조설비
      </div>
    </div>
  );

  const jobCardBack = (
    <div className={styles.cardPile}>
      <img
        src={jobBackImage}
        alt="job_back"
        style={{
          position: "absolute",
          top: "0%",
          left: "200%",
          cursor: "pointer",
        }}
        onClick={handleJobCardStackClick}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{
          position: "absolute",
          top: "10%",
          left: "200%",
          cursor: "pointer",
        }}
        onClick={handleJobCardStackClick}
      />
      <img
        src={jobBackImage}
        alt="job_back"
        style={{
          position: "absolute",
          top: "20%",
          left: "200%",
          cursor: "pointer",
        }}
        onClick={handleJobCardStackClick}
      />
      <div
        className={styles.jobBackText}
        style={{ position: "relative", top: "-25%", left: "222%" }}
      >
        직업
      </div>
    </div>
  );

  const selectCard = async () => {
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { clay: data.clay - 2 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      clay: gameResources.clay + 2,
    });
  };

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
        <>
          {cardsToShow === majorCardStack && (
            <MajorModal
              cards={cardsToShow}
              onClose={() => setModalOpen(false)}
              onCardClick={(cardImage) => {
                handleModalMajorCardClick(cardImage);
              }}
              onEnableButtonClick={handleEnableButtonClick}
              selectCard={selectCard}
            />
          )}
          {cardsToShow === subCardStack && (
            <SubModal
              cards={cardsToShow}
              onClose={() => setModalOpen(false)}
              onCardClick={(cardImage) => {
                handleModalSubCardClick(cardImage);
              }}
            />
          )}
          {cardsToShow === jobCardStack && (
            <JobModal
              cards={cardsToShow}
              onClose={() => setModalOpen(false)}
              onCardClick={(cardImage) => {
                handleModalJobCardClick(cardImage);
              }}
            />
          )}
          {cardsToShow === majorCards && (
            <MajorModal
              cards={cardsToShow}
              onClose={() => setModalOpen(false)}
              onCardClick={(cardImage) => {
                handleModalMajorCardClick(cardImage);
              }}
              onEnableButtonClick={handleEnableButtonClick}
              selectCard={selectCard}
            />
          )}
          {cardsToShow === subCards && (
            <SubModal
              cards={cardsToShow}
              onClose={() => setModalOpen(false)}
              onCardClick={(cardImage) => {
                handleModalSubCardClick(cardImage);
              }}
            />
          )}
          {cardsToShow === jobCards && (
            <JobModal
              cards={cardsToShow}
              onClose={() => setModalOpen(false)}
              onCardClick={(cardImage) => {
                handleModalJobCardClick(cardImage);
              }}
            />
          )}
        </>
      )}

      {hwaroModalOpen && (
        <HwaroModal
          cards={hwaroCardStack}
          onClose={() => setHwaroModalOpen(false)}
          onCardClick={() => {}}
          inquiryUserStorage={inquiryUserStorage}
          memberId={memberId}
          currentShowUser={currentShowUser}
          myID={myID}
          sendUserData={sendUserData}
          sendCommonstorageData={sendCommonstorageData}
          roomnumber={roomnumber}
        />
      )}
    </div>
  );
}
export default CardBoard;

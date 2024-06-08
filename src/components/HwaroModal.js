import React from "react";
import { useResources } from "../context/ResourceContext";
import styles from "./HwaroModal.module.css";

function HwaroModal({
  cards,
  onClose,
  onCardClick,
  inquiryUserStorage,
  memberId,
  currentShowUser,
  myID,
  sendUserData,
  sendCommonstorageData,
  roomnumber,
}) {
  const {
    updateGameResources,
    updateUserResources,
    userResources,
    gameResources,
  } = useResources();

  const handleClose = async (e) => {
    e.stopPropagation();
    onClose();
    console.log("교습1 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { grain: data.grain - 1, food: data.food + 2 },
      update: doUpdate,
    });
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      grain: gameResources.grain + 1,
      food: gameResources.food - 2,
    });
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <span className={styles.headerText}>옵션 선택</span>
        <div className={styles.cardContainer}>
          {cards.map((card, index) => (
            <img
              key={index}
              src={card}
              alt={`Card ${index}`}
              className={styles.cards}
              onClick={() => onCardClick(card)}
            />
          ))}
        </div>
        <button className={styles.closeButton} onClick={handleClose}>
          사용
        </button>
      </div>
    </div>
  );
}

export default HwaroModal;

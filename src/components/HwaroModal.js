import React from "react";
import { useResources } from "../context/ResourceContext";
import styles from "./HwaroModal.module.css";


function HwaroModal({ cards, onClose, onCardClick }) {
  const { updateGameResources, updateUserResources, userResources,gameResources } = useResources();

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
    updateUserResources({ grain: userResources.grain - 1 });
    updateUserResources({ food: userResources.food + 2 });
    updateGameResources({ grain: gameResources.grain + 1 });
    updateGameResources({ food: gameResources.food - 2 });
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
        <button
          className={styles.closeButton}
          onClick={handleClose}
        >
          사용
        </button>
      </div>
    </div>
  );
}

export default HwaroModal;

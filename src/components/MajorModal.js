import React from "react";
import styles from "./MajorModal.module.css";


function MajorModal({ cards, onClose, onCardClick, onEnableButtonClick  }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <span className={styles.headerText}>카드 선택</span>
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
          onClick={(e) => {
            e.stopPropagation();
            onEnableButtonClick();
          }}
        >
          사용
        </button>
      </div>
    </div>
  );  
}
export default MajorModal;

import React from "react";
import styles from "./Modal.module.css";

function Modal({cards, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
      <span className={styles.headerText}>카드 선택</span>
        <div className={styles.cardContainer}>
          {cards.map((cards, index) => (
            <img
              key={index}
              src={cards}
              alt={`Card ${index + 1}`}
              className={styles.cards}
            />
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          완료
        </button>
      </div>
    </div>
  );
}

export default Modal;

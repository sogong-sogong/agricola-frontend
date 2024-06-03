// src/ResourceDisplay.js

import React from 'react';
import styles from './ResourceDisplay.module.css';

const ResourceDisplay = ({ resources, resourceIcons }) => {
  // Split resources into two rows for display
  const Resources = ['branch', 'clay', 'rock', 'reed', 'seed', 'vegetable', 'food', 'sheep', 'pig', 'cow', 'mark', 'fence', 'house','farmer','begging'];

  return (
    <div className={styles.resourceContainer}>
      <div className={styles.resourceRow}>
        {Resources.map((resource) => (
          resourceIcons[resource] && (
            <div key={resource} className={styles.resource}>
              <img src={resourceIcons[resource]} alt={resource} />
              <span>{resources[resource]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ResourceDisplay;

import React, { useState } from "react";
import styles from "./HomeBoard.module.css";

import woodImg from "../assets/objects/wood.png";
import soilImg from "../assets/objects/soil.png";
import coalImg from "../assets/objects/coal.png";
import reedImg from "../assets/objects/reed.png";
import grainImg from "../assets/objects/grain.png";
import vegeImg from "../assets/objects/vege.png";
import foodImg from "../assets/objects/food.png";
import beggingImg from "../assets/objects/begging.png";

import sheepImg from "../assets/objects/sheep.png";
import boarImg from "../assets/objects/boar.png";
import cowImg from "../assets/objects/cow.png";

import farmerImg from "../assets/objects/farmer.png";
import fenceImg from "../assets/objects/fence.png";
import homeImg from "../assets/objects/home.png";

import farmlandImg from "../assets/objects/farmland.png";
import woodhomeImg from "../assets/objects/wood_home.jpg";
import soilhomeImg from "../assets/objects/soil_home.jpg";
import stonehomeImg from "../assets/objects/stone_home.jpg";



function HomeBoard() {
  const resourceData1 = [
    {
      name: "leftBox",
      img: [woodImg, soilImg,coalImg,reedImg,
        grainImg,vegeImg,foodImg,beggingImg],
      number: [0,1,3,4,3,2,2,0],
    },
  ];

  const resourceData2 = [
  {
    name: "middleBox",
    img: [sheepImg, boarImg,cowImg],
    number: [3,3,4],
  },
];

  const resourceData3 = [
    {
      name: "rightBox",
      img: [farmerImg, fenceImg,homeImg],
      number: [2,2,2],
    },
  ]; 

  const farmland = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 5; j++) {
      if (i === 0 && j === 0) {
        farmland.push(
          <img
            key={`img-${i}-${j}`}
            className="grid-item"
            src={farmlandImg}
            alt="farmland"
          />
        );

      } else if (j === 0) {
        farmland.push(
          <img
            key={`img-${i}-${j}`}
            className="home"
            src={woodhomeImg}
            alt="wood_home"
            style={{ width: '14%', height: 'auto', position: 'relative', left: '-1%', top: '-1%' }}
            />
        );
      }
        else {
        farmland.push(
          <img
            key={`img-${i}-${j}`}
            className="grid-item"
            src={farmlandImg}
            alt="Farmland Image"
          />
        );
      }
    }
  }
  
  

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        개인 창고
      </div>
      <div className={styles.middleSection}>
        <div className={styles.box1}>
          <div className={styles.resource1}>
            {resourceData1.map((data, index) => (
              <div key={index} className={styles.resource1}>
                {data.img.map((imgSrc, imgIndex) => (
                  <React.Fragment key={imgIndex}>
                    <span>{data.number[imgIndex]}</span>
                    <img src={imgSrc} alt="resource" style={{ marginRight: '4%' }}/>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.resource2}>
            {resourceData2.map((data, index) => (
              <div key={index} className={styles.resource2}>
                {data.img.map((imgSrc, imgIndex) => (
                  <React.Fragment key={imgIndex}>
                    <div key={imgIndex} className={styles.resourceItem}>
                      <span>{data.number[imgIndex]}</span>
                      <img src={imgSrc} alt="resource" style={{ marginRight: '11%' }}/>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
          <div className={styles.box3}>
            <div className={styles.resource3}>
              {resourceData3.map((data, index) => (
                <div key={index} className={styles.resource3}>
                  {data.img.map((imgSrc, imgIndex) => (
                    <React.Fragment key={imgIndex}>
                      <div key={imgIndex} className={styles.resourceItem}>
                        <span>{data.number[imgIndex]}</span>
                          {imgIndex === 0 && <span style={{ fontSize: 'x-small' }}>/5</span>}
                          {imgIndex === 1 && <span style={{ fontSize: 'x-small' }}>/15</span>}
                          {imgIndex === 2 && <span style={{ fontSize: 'x-small' }}>/4</span>}
                        <img src={imgSrc} alt="resource" style={{ marginRight: '4.5%' }}/>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.farmland}>        
          {farmland}
        </div>
      </div>
    </div>
  );
}

export default HomeBoard;
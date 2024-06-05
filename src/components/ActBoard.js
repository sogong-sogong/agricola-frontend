

import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from './ActBoard.module.css';
import ResourceDisplay from './ResourceDisplay';
import { useResources } from "../context/ResourceContext";

import bush1 from '../assets/image/1_bush.png';
import farmEx2 from '../assets/image/2_farm_expending.png';
import forest7 from '../assets/image/7_forest.png';
import get8 from '../assets/image/8_Gethering.png';
import forest9 from '../assets/image/9_forests.png';
import rsc13 from '../assets/image/13_resource_market.png';
import grain14 from '../assets/image/14_grainz_storage.png';
import clay19 from '../assets/image/19_getting_clay.png';
import farmGet20 from '../assets/image/20_farm_getting.png';
import clay21 from '../assets/image/21_clay_getting.png';
import study25 from '../assets/image/25_study.png';
import studay26 from '../assets/image/26_study.png';
import reed27 from '../assets/image/27_reed_yard.png';
import show31 from '../assets/image/31_show.png';
import sell32 from '../assets/image/32_selling.png';
import fish33 from '../assets/image/33_fishing.png';

import round1 from '../assets/image/number1.png';
import round2 from '../assets/image/number2.png';
import round3 from '../assets/image/number3.png';
import round4 from '../assets/image/number4.png';
import round5 from '../assets/image/number5.png';
import round6 from '../assets/image/number6.png';

import round1a from '../assets/image/1-1.png';
import round1b from '../assets/image/1-2.png';
import round1c from '../assets/image/1-3.png';
import round1d from '../assets/image/1-4.png';
import round2a from '../assets/image/2-1.png';
import round2b from '../assets/image/2-2.png';
import round2c from '../assets/image/2-3.png';
import round3a from '../assets/image/3-1.png';
import round3b from '../assets/image/3-2.png';
import round4a from '../assets/image/4-1.png';
import round4b from '../assets/image/4-2.png';
import round5a from '../assets/image/5-1.png';
import round5b from '../assets/image/5-2.png';
import round6a from '../assets/image/6-1.png';


import branchIcon from '../assets/image/tree.png';
import seedIcon from '../assets/image/seed.png';
import clayIcon from '../assets/image/clay.png';
import rockIcon from '../assets/image/rock.png';
import reedIcon from '../assets/image/reed.png';
import vegetableIcon from '../assets/image/vegetable.png';
import houseIcon from '../assets/image/house.png';
import turnIcon from '../assets/image/turn.png';
import cardIcon from '../assets/cards/job/bricklayer.jpg';
import foodIcon from '../assets/image/food.png';
import fenceIcon from '../assets/image/fence.png';


import pigIcon from '../assets/image/pig.png';
import cowIcon from '../assets/image/cow.png';
import sheepIcon from '../assets/image/sheep.png';
import begIcon from '../assets/image/beg.png';


import mark from '../assets/image/farmer_blue.png';

const ActBoard = () => {
  const [selectedButton, setSelectedButton] = useState(false);
  const {gameResources, userResources, updateGameResources,updateUserResources,} = useResources();
  const [showButtons, setShowButtons] = useState(false); // State to manage button visibility


  const [familyCount, setFamilyCount] = useState(0); // 가족 몇 명이 행동판에 올라갔는지 센다.

  const resourceIcons = {
    branch: branchIcon,
    seed: seedIcon,
    clay: clayIcon,
    rock: rockIcon,
    reed: reedIcon,
    sheep: sheepIcon,
    turn: turnIcon,
    card: cardIcon,
    food: foodIcon,
    vegetable: vegetableIcon,
    pig: pigIcon,
    cow: cowIcon,
  };

  //덤불
  const handleButton16 = () => {
    updateGameResources({ wood: gameResources.wood - 1 });
    updateUserResources({ wood: userResources.wood + 1 });
     setSelectedButton(true);
  };

  //농장확장
  const handleButton22 = () => {
    updateGameResources({ wood: gameResources.wood + 5 , weed: gameResources.weed + 2});
    updateUserResources({ wood: userResources.wood - 5 , weed: userResources.weed - 2});
  };
  */

  const cards = [
    { id: 16, image: bush1, resources: { branch: 1 } },
    { id: 22, image: farmEx2, resources: { branch: -2, barn: 1 } },
    { id: 32, image: round1a },
    { id: 33, image: round1b },
    { id: 34, image: round1c },
    { id: 35, image: round1d },

    { id: 17, image: forest7, resources: { branch: 2 } },
    { id: 23, image: get8, resources: { turn: 1, card: 1 } },
    { id: 28, image: forest9, resources: { branch: 3 } },
    { id: 36, image: round2a },
    { id: 37, image: round2b },
    { id: 38, image: round2c },

    { id: 18, image: rsc13, resources: { reed: 1, rock: 1, food: 1 } },
    { id: 24, image: grain14, resources: { seed: 1 } },
    { id: 100 },
    { id: 39, image: round3a },
    { id: 40, image: round3b },
    { id: 101 },

    { id: 19, image: clay19, resources: { clay: 2 } },
    { id: 25, image: farmGet20, resources: { reed: 1, rock: 1, food: 1 } },
    { id: 29, image: clay21, resources: { seed: 1 } },
    { id: 41, image: round4a },
    { id: 42, image: round4b },
    { id: 102 },

    { id: 20, image: study25, resources: { food: -2, card: 1 } },
    { id: 26, image: studay26, resources: { food: -1, card: 1 } },
    { id: 30, image: reed27, resources: { reed: 1 } },
    { id: 43, image: round5a },
    { id: 44, image: round5b },
    { id: 45, image: round6a },

    { id: 21, image: show31, resources: { food: 1 } },
    { id: 27, image: sell32, resources: { food: 2 } },
    { id: 31, image: fish33, resources: { food: 1 } },

    // Add more cards if needed
  ];

  const handleCardClick = (card) => {
    if (!selectedCards.includes(card.id)) {
      setSelectedCards([...selectedCards, card.id]);

      // Update user resources
      const updatedUserResources = { ...userResources };
      const updatedGameResources = { ...gameResources };

      Object.keys(card.resources).forEach((resource) => {
        // Update user resources
        updatedUserResources[resource] =
          (updatedUserResources[resource] || 0) + card.resources[resource];

        // Update game resources
        updatedGameResources[resource] =
          (updatedGameResources[resource] || 0) - card.resources[resource];
      });

      setUserResources(updatedUserResources);
      setGameResources(updatedGameResources);

      console.log("Updated User Resources:", updatedUserResources);
      console.log("Updated Game Resources:", updatedGameResources);
    }
  };

  // 테스트 함수
  const test = async () => {
    //inquiryFamilyPosition();
    console.log(familyCount);
  };


  //양시장
  const handleButton32 = () => {
    updateGameResources({ sheep: gameResources.sheep - 1 });
    updateUserResources({ sheep: userResources.sheep + 1 });
  };

  //울타리 
  //+ 개수 선택 모달 + 농장판 선택 연결필요
  const handleButton33 = () => {
    updateGameResources({ wood: gameResources.wood + 1 });
    updateUserResources({ fence: userResources.fence - 1 });
  };

  //곡식활용
  //+ 농장판 선택 연결필요
  const handleButton34 = () => {
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //주요설비
  // + 카드 모달창 연결 필요
  const handleButton35 = () => {
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //수풀
  const handleButton17 = () => {
    updateGameResources({ wood: gameResources.wood - 2 });
    updateUserResources({ wood: userResources.wood + 2 });
  };

  //회합장소
  //+ 설비 카드 모달 창, 선턴 얻는 거 추가 필요 
  const handleButton23 = () => {
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //숲
  const handleButton28 = () => {
    updateGameResources({ wood: gameResources.wood - 3 });
    updateUserResources({ wood: userResources.wood + 3 });
  };

  //가족늘리기
  const handleButton36 = () => {
    //+ 추가하기,만약 farmID 1~15중에 type 이 0인 방이 있다면 
    updateUserResources({ family: userResources.family + 1 });
  };

  //서부채석장
  const handleButton37 = () => {
    updateGameResources({ stone: gameResources.stone - 1 });
    updateUserResources({ stone: userResources.stone + 1 });
  };

  //집개조
  const handleButton38 = () => {
    //+ 추가하기, 만약 farmID 1~15중에 type 이 2인 방이 있다면 (돌집)
    updateGameResources({ weed: gameResources.weed + 1, clay: gameResources.clay +1 });
    updateUserResources({ weed: userResources.weed - 1, clay: userResources.clay - 1 });
    //+ 추가하기, 주요/설비카드 모달
  };

  //자원시장
  const handleButton18 = () => {
    
    updateGameResources({ weed: gameResources.weed - 1, clay: gameResources.clay - 1, food: gameResources.food - 1});
    updateUserResources({ weed: userResources.weed + 1, clay: userResources.clay + 1, food: userResources.food +1 });

  };

  //곡식종자
  const handleButton24 = () => {
    updateGameResources({ grain: gameResources.grain - 1 });
    updateUserResources({ grain: userResources.grain + 1 });

  };

  //흙 채굴장
  const handleButton29 = () => {
    updateGameResources({ clay: gameResources.clay - 1 });
    updateUserResources({ clay: userResources.clay + 1 });
  };

  //돼지시장
  const handleButton39 = () => {
    updateGameResources({ pig: gameResources.pig - 1 });
    updateUserResources({ pig: userResources.pig + 1 });
  };

  //채소종자
  const handleButton40 = () => {
    updateGameResources({ vegetable: gameResources.vegetable - 1 });
    updateUserResources({ vegetable: userResources.vegetable + 1 });
  };

  //점토채굴장
  const handleButton19 = () => {
    updateGameResources({ clay: gameResources.clay - 2 });
    updateUserResources({ clay: userResources.clay + 2 });
  };

  //농지
  const handleButton25 = () => {
    //추가하기, farm id 하나를 선택하게 하고, 그걸 type 2 (농지)로 바꿔주기

  };

  //갈대밭
  const handleButton30 = () => {
    updateGameResources({ weed: gameResources.weed - 1 });
    updateUserResources({ weed: userResources.weed + 1 });
  };
  
  //소시장
  const handleButton41 = () => {
    updateGameResources({ cow: gameResources.cow - 1 });
    updateUserResources({ cow: userResources.cow + 1 });
  };

  //동부채석장
  const handleButton42 = () => {
    updateGameResources({ stone: gameResources.stone - 1 });
    updateUserResources({ stone: userResources.stone + 1 });
  };

  //교습1
  const handleButton20 = () => {
    updateGameResources({ food: gameResources.food + 2 });
    updateUserResources({ food: userResources.food - 2 });
    //추가하기, + 직업카드 모달열고 1개 선택
  };

  //교습2
  const handleButton26 = () => {
    updateGameResources({ food: gameResources.food + 2 });
    updateUserResources({ food: userResources.food - 1 });
    //추가하기, + 직업카드 모달열고 1개 선택
  };

  //낚시
  const handleButton31 = () => {
    updateGameResources({ food: gameResources.food - 1 });
    updateUserResources({ food: userResources.food + 1 });
  };

  //급한가족늘리기
  const handleButton43 = () => {
    updateUserResources({ family: userResources.family + 1 });
  };

  //밭농사
  const handleButton44 = () => {
    //추가하기, farm id 하나를 선택하게 하고, 그걸 type 2 (농지)로 바꿔주기
    //그리고 또는 farm id 하나를 선택하게 하고, grain, vegetable 씨뿌리기
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //농장개조
  const handleButton45 = () => {
    //+ 추가하기, 만약 farmID 1~15중에 type 이 2인 방이 있다면 (돌집), 
    updateGameResources({ weed: gameResources.weed + 1, clay: gameResources.clay +1 });
    updateUserResources({ weed: userResources.weed - 1, clay: userResources.clay - 1 });
    // wood 개수 선택해서 펜스 구매하는 모달
    updateGameResources({ wood: gameResources.wood + 1 });
    updateUserResources({ fence: userResources.fence - 1 });
  };

  //유랑극단
  const handleButton21 = () => {
    updateGameResources({ food: gameResources.food - 1 });
    updateUserResources({ food: userResources.food + 1 });
  };

  //날품팔이
  const handleButton27 = () => {
    updateGameResources({ food: gameResources.food - 2 });
    updateUserResources({ food: userResources.food + 2 });
  };

  //데모 라운드5 점프 버튼
  //자원 조정, 라운드 카드 가려놨던 거 5라운드카드까지 다 뒤집기
  const Lound5 = () => {
    setShowButtons(true);
  };

  //데모 라운드6 점프 버튼
  //자원 조정, 라운드 카드 가려놨던 거 6라운드카드까지 다 뒤집기
  const Lound6 = () => {
    updateGameResources({ food: gameResources.food - 2 });
    updateUserResources({ food: userResources.food + 2 });
  };
  
  //데모 수확 점프 버튼
  //자원 조정, 라운드 카드 가려놨던 거 6라운드카드까지 다 뒤집기
  const harvest = () => {
    updateGameResources({ food: gameResources.food - 2 });
    updateUserResources({ food: userResources.food + 2 });
  };



  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <button className={styles.button} id="16" onClick={handleButton16}>
          <img src={bush1} alt="bush1" />
                      {selectedButton && (
              <div className={styles.userMark}><img src={mark} alt="User Mark" /></div>
            )}
        </button>
        <button className={styles.button} id="22" onClick={handleButton22}>
          <img src={farmEx2} alt="farmEx2" />
        </button>
        <button className={styles.button} id="32" onClick={handleButton32}>
          <img src={round1a} alt="round1a" />
        </button>
        <button className={styles.button} id="33" onClick={handleButton33}>
          <img src={round1b} alt="round1b" />
        </button>
        <button className={styles.button} id="34" onClick={handleButton34}>
          <img src={round1c} alt="round1c" />
        </button>
        <button className={styles.button} id="35" onClick={handleButton35}>
          <img src={round1d} alt="round1d" />
        </button>
        <button className={styles.button} id="17" onClick={handleButton17}>
          <img src={forest7} alt="forest7" />
        </button>
        <button className={styles.button} id="23" onClick={handleButton23}>
          <img src={get8} alt="get8" />
        </button>
        <button className={styles.button} id="28" onClick={handleButton28}>
          <img src={forest9} alt="forest9" />
        </button>
        <button className={styles.button} id="36" onClick={handleButton36}>
          <img src={round2a} alt="round2a" />
        </button>
        <button className={styles.button} id="37" onClick={handleButton37}>
          <img src={round2b} alt="round2b" />
        </button>
        <button className={styles.button} id="38" onClick={handleButton38}>
          <img src={round2c} alt="round2c" />
        </button>
        <button className={styles.button} id="18" onClick={handleButton18}>
          <img src={rsc13} alt="rsc13" />
        </button>
        <button className={styles.button} id="24" onClick={handleButton24}>
          <img src={grain14} alt="grain14" />
        </button>
        <button className={styles.button} id="29" onClick={handleButton29}>
          <img src={clay21} alt="clay21" />
        </button>
        <button className={styles.button} id="39" onClick={handleButton39}>
          <img src={round3a} alt="round3a" />
        </button>
        <button className={styles.button} id="40" onClick={handleButton40}>
          <img src={round3b} alt="round3b" />
        </button>
        <div></div>
        <button className={styles.button} id="19" onClick={handleButton19}>
          <img src={clay19} alt="clay19" />
        </button>
        <button className={styles.button} id="25" onClick={handleButton25}>
          <img src={farmGet20} alt="farmGet20" />
        </button>
        <button className={styles.button} id="30" onClick={handleButton30}>
          <img src={reed27} alt="reed27" />
        </button>
        <button className={styles.button} id="41" onClick={handleButton41}>
          <img src={round4a} alt="round4a" />
        </button>
        <button className={styles.button} id="42" onClick={handleButton42}>
          <img src={round4b} alt="round4b" />
        </button>
        <div></div>
        <button className={styles.button} id="20" onClick={handleButton20}>
          <img src={study25} alt="study25" />
        </button>
        <button className={styles.button} id="26" onClick={handleButton26}>
          <img src={studay26} alt="studay26" />
        </button>
        <button className={styles.button} id="31" onClick={handleButton31}>
          <img src={fish33} alt="fish33" />
          </button>
        <button className={styles.button} id="43" onClick={handleButton43}>
          <img src={round5a} alt="round5a" />
        </button>
        <button className={styles.button} id="44" onClick={handleButton44}>
          <img src={round5b} alt="round5b" />
        </button>
        <button className={styles.button} id="45" onClick={handleButton45}>
          <img src={round6a} alt="round6a" />
        </button>
        <button className={styles.button} id="21" onClick={handleButton21}>
          <img src={show31} alt="show31" />
        </button>
        <button className={styles.button} id="27" onClick={handleButton27}>
          <img src={sell32} alt="sell32" />
        </button>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.resources}>
        <ResourceDisplay resources={gameResources} resourceIcons={resourceIcons} />
      </div>
      <div className={styles.right}>
        <button onClick={Lound5}>Lound 5-2</button>
        <button onClick={Lound6}>Lound 6-1</button>
        <button onClick={harvest}>수확</button>
      </div>
    </div>
  );
};

export default ActBoard;

import React, { useState } from 'react';
import styles from './ActBoard.module.css';
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


// import seedImage from '../image/seed.png';
// import clayImage from '../image/clay.png';
// import rockImage from '../image/rock.png';
// import reedImage from '../image/reed.png';

import userMark from '../assets/image/farmer_blue.png';

const ActBoard = () => {
  const [userResources, setUserResources] = useState({
    branch: 0,
    seed: 0,
    clay: 0,
    rock: 0,
    reed: 0,
    barn: 0,
    sheep: 0,
    firsturn: 0,
    card: 0,
    food:0
  });

  const [selectedCard, setSelectedCard] = useState(null);


  const cards = [
    { id: 1, image: bush1, resources: { branch: 1 } },
    { id: 2, image: farmEx2, resources: { branch: -2, barn :1 } },
    { id: 3, image: round1},
    { id: 4, image: round1},
    { id: 5, image: round1},
    { id: 6, image: round1},
    { id: 7, image: forest7, resources: { branch: 2 } },
    { id: 8, image: get8, resources: { firsturn: 1, card: 1 } },
    { id: 9, image: forest9, resources: { branch: 3 } },
    { id: 10, image: round2},
    { id: 11, image: round2},
    { id: 12, image: round2},
    { id: 13, image: rsc13, resources: { reed: 1, rock: 1, food: 1 } },
    { id: 14, image: grain14, resources: { seed :1 } },
    { id: 15, },
    { id: 16, image: round3},
    { id: 17, image: round3},
    { id: 18 },
    { id: 19, image: clay19, resources: { clay :2  } },
    { id: 20, image: farmGet20, resources: { reed: 1, rock: 1, food: 1 } },
    { id: 21, image: clay21, resources: { seed :1,  } },
    { id: 22, image: round4},
    { id: 23, image: round4},
    { id: 24 },
    { id: 25, image: study25, resources: {food: -2, card: 1} },
    { id: 26, image: studay26, resources: {food: -1, card: 1} },
    { id: 27, image: reed27, resources: {reed: 1}},
    { id: 28, image: round5},
    { id: 29, image: round5},
    { id: 30, image: round6 },
    { id: 31, image: show31, resources: {food: 1}},
    { id: 32, image: sell32, resources: {food: 2}},
    { id: 33, image: fish33, resources: {food: 1}},
    // Add more cards if needed
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    const updatedUserResources = { ...userResources };

    

    // Update user resources
    Object.keys(card.resources).forEach(resource => {
      updatedUserResources[resource] += card.resources[resource];
    });

    setUserResources(updatedUserResources);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {cards.map((card) => (
          <button
            key={card.id}
            className={styles.card}
            onClick={() => handleCardClick(card)}
          >
            {selectedCard && selectedCard.id === card.id && (
              <img src={userMark} className={styles.userMark} alt="User Mark" />
            )}
            <img src={card.image} alt={card.name} />
            <span>{card.name}</span>
          </button>
        ))}
      </div>
      <div>
        <h3>User Resources</h3>
        <ul>
          {Object.keys(userResources).map((resource) => (
            <li key={resource}>
              {resource}: {userResources[resource]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActBoard;
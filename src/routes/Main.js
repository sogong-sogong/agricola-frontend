import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Main.module.css";

import ActBoard from "../components/ActBoard";
import HomeBoard from "../components/HomeBoard";
import CardBoard from "../components/CardBoard";
import LogBoard from "../components/LogBoard";

import { useResources } from "../context/ResourceContext";
import useWebSocket from "../hook/useWebSocket";
import useInquiryData from "../hook/useInquiryData";
import useSendData from "../hook/useSendData";

function Main({ ipAddress, portNum }) {
  const {
    updateGameResources,
    setScore,
    updateUserResources,
    stompClient,
    roomnumber,
    memberId,
    gameStart,
    setGameStart,
    currentShowUser,
    setCurrentShowUser,
    userInfos,
    setUserInfos,
    familyPosition,
    setFamilyPosition,
  } = useResources();

  const {
    disconnect,
    sendData,
    sendCommonstorageData,
    updateFamilyPosition,
    initializeFamilyPosition,
    updateTurn,
    updateRound,
  } = useWebSocket({
    stompClient,
    roomnumber,
    memberId,
    familyPosition,
  });

  const {
    farmData,
    houseData,
    cageData,
    setCageData,
    inquiryFarm,
    inquiryHouse,
    inquiryCage,
    inquiryFamilyPosition,
    inquiryUserStorage,
    inquiryCommonstorage,
    inquiryScore,
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

  const { updateFarmData, updateHouseData, updateCageData, sendUserData } =
    useSendData({
      ipAddress,
      portNum,
      memberId,
      inquiryFarm,
      inquiryHouse,
      setCageData,
      inquiryCage,
      updateUserResources,
    });

  // 테스트 함수
  const test = () => {
    console.log(userInfos);
  };

  const [visibleButtons, setVisibleButtons] = useState(
    new Set([32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45])
  );
  const [familyCount, setFamilyCount] = useState(0); // 가족 몇 명이 행동판에 올라갔는지 센다.

  const myID = findMemberInfo(Number(memberId)).number; // 자신의 number

  const [familyID, setFamilyID] = useState([]);

  function findMemberInfo(memberId) {
    const memberInfo = userInfos.find((member) => member.memberId === memberId);
    return memberInfo
      ? memberInfo
      : `Member with memberId ${memberId} not found`;
  }

  // 웹소켓 구독 함수 - main
  const connect = () => {
    // Stomp.over에 WebSocket을 생성하는 공장 함수 전달
    stompClient.current = Stomp.over(
      () => new WebSocket(`ws://${ipAddress}:${portNum}/ws-stomp`)
    );

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};

    stompClient.current.connect(
      {},
      (frame) => {
        console.log("연결 성공");
        stompClient.current.subscribe(`/sub/room/${roomnumber}`, (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("메시지 도착:", newMessage);

          // 어떤 메시지인지 구분하여 다음 실행을 수행한다.
          if (Array.isArray(newMessage) && newMessage[0].family) {
            console.log(
              "메시지 경로",
              `/pub/room/${roomnumber}/family/position/update`
            );
            setFamilyPosition(newMessage);
          } else if (
            Array.isArray(newMessage) &&
            newMessage[0].memberId !== undefined
          ) {
            console.log("메시지 경로", `/pub/room/${roomnumber}`);
            // number 순서로 정렬
            newMessage.sort((a, b) => a.number - b.number);
            setUserInfos(newMessage);
            if (newMessage.length > 3) {
              setGameStart(true);
            }
          } else if (
            Array.isArray(newMessage) &&
            Array.isArray(newMessage[0])
          ) {
            console.log("메시지 경로", `/pub/room/${roomnumber}/round/update`);
            console.log(newMessage[0].length);
            if (newMessage[0].length === 1) {
              console.log("1라운드 시작");
              setFamilyCount(0);
              setVisibleButtons(
                new Set([33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45])
              );
            } else if (newMessage[0].length === 2) {
              console.log("1-1라운드 시작");

              setFamilyCount(0);
              setVisibleButtons(
                new Set([34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45])
              );
            } else if (newMessage[0].length === 13) {
              console.log("5-2라운드 시작");
              setFamilyCount(0);
              setVisibleButtons(new Set([45]));
            } else if (newMessage[0].length === 14) {
              console.log("6-1라운드 시작");
              setFamilyCount(0);
              setVisibleButtons(new Set([]));
            }
          } else if (newMessage.id !== undefined) {
            console.log("메시지 경로", `/pub/room/${roomnumber}/common/update`);
            updateGameResources(newMessage);
          } else if (newMessage.starter !== undefined) {
            console.log(
              "메시지 경로",
              `/pub/room/${roomnumber}/starter/update`
            );
            updateGameResources(newMessage);
            updateStarter(newMessage.starter);
          } else {
            console.log("undefined message....");
          }
        });
        sendData(); // 연결되면 sendData 호출
      },
      (error) => {
        console.error("연결 실패:", error);
      }
    );
  };

  // number 값에 따라 starter 변경
  const updateStarter = (number) => {
    setUserInfos((prevData) => {
      // 데이터를 복제하여 수정
      const newData = prevData.map((item) => {
        return {
          ...item,
          starter: item.number === number, // number와 일치하는 경우 true, 그렇지 않으면 false
        };
      });
      return newData;
    });
  };

  // 컴포넌트가 마운트될 때 쿠키에서 멤버 아이디를 가져온다.
  useEffect(() => {
    console.log("방 번호: ", roomnumber);
    console.log("멤버 아이디: ", memberId);
    connect();
    inquiryCommonstorage();
    inquiryFamilyPosition();
    inquiryUserStorage({ id: memberId, update: true });
  }, []);

  // roomnumber가 설정될 때 connect 함수 호출
  // roomnumber가 설정될 때 공동창고 자원 초기화
  // roomnumber가 설정될 때 가족 초기 위치를 가져온다.
  useEffect(() => {
    if (roomnumber) {
      // connect가 프로미스를 반환한다고 가정
      //inquiryFarm();
    }

    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, [roomnumber]);

  // 가족 위치 초기화
  useEffect(() => {
    if (roomnumber) {
      inquiryFamilyPosition();
    }
    //updateStarter(1)
  }, [userInfos]);

  useEffect(() => {
    let array = [];
    familyPosition.forEach((item) => {
      //console.log(item.memberId);
      if (item.memberId === Number(memberId)) {
        array.push(item.family[0].id); // 배열에 아이템을 추가
        array.push(item.family[1].id);
      }
    });
    //console.log("최종", array); // 최종 배열을 출력
    setFamilyID(array);
  }, [familyPosition]);

  return (
    <div className={styles.container}>
      <div className={styles.leftBoard}>
        <div className={styles.header}>
          <div className={styles.text} onClick={test}>
            ROOM #{roomnumber} {gameStart ? "" : "대기중... "}
          </div>
        </div>
        <div className={styles.gameBoard}>
          <div className={styles.actBoard}>
            <ActBoard
              roomnumber={roomnumber}
              memberId={Number(memberId)}
              inquiryFamilyPosition={inquiryFamilyPosition}
              updateFamilyPosition={updateFamilyPosition}
              userInfos={userInfos}
              familyPosition={familyPosition}
              sendCommonstorageData={sendCommonstorageData}
              sendUserData={sendUserData}
              inquiryUserStorage={inquiryUserStorage}
              currentShowUser={currentShowUser}
              myID={myID}
              updateTurn={updateTurn}
              visibleButtons={visibleButtons}
              setVisibleButtons={setVisibleButtons}
              updateRound={updateRound}
              updateFarmData={updateFarmData}
              inquiryFarm={inquiryFarm}
              updateCageData={updateCageData}
              cageData={cageData}
              initializeFamilyPosition={initializeFamilyPosition}
              familyCount={familyCount}
              setFamilyCount={setFamilyCount}
              findMemberInfo={findMemberInfo}
              familyID={familyID}
              farmData={farmData}
            />
          </div>
          <div className={styles.rightBoard}>
            <div className={styles.homeBoard}>
              <HomeBoard
                farmData={farmData}
                houseData={houseData}
                cageData={cageData}
                inquiryFarm={inquiryFarm}
                familyPosition={familyPosition}
                currentShowUser={currentShowUser}
                myID={myID}
                updateFarmData={updateFarmData}
                updateHouseData={updateHouseData}
                inquiryHouse={inquiryHouse}
                memberId={Number(memberId)}
                updateCageData={updateCageData}
                inquiryUserStorage={inquiryUserStorage}
                sendUserData={sendUserData}
                sendCommonstorageData={sendCommonstorageData}
                roomnumber={roomnumber}
              />
            </div>

            <div className={styles.cardBoard}>
              <CardBoard
                inquiryUserStorage={inquiryUserStorage}
                memberId={Number(memberId)}
                currentShowUser={currentShowUser}
                myID={myID}
                sendUserData={sendUserData}
                sendCommonstorageData={sendCommonstorageData}
                roomnumber={roomnumber}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logBoard}>
        <LogBoard
          memberId={Number(memberId)}
          userInfos={userInfos}
          inquiryScore={inquiryScore}
          familyPosition={familyPosition}
          setCurrentShowUser={setCurrentShowUser}
          myID={myID}
          farmData={farmData}
          inquiryFarm={inquiryFarm}
          inquiryHouse={inquiryHouse}
          inquiryCage={inquiryCage}
          inquiryUserStorage={inquiryUserStorage}
          gameStart={gameStart}
          currentShowUser={currentShowUser}
          sendUserData={sendUserData}
        />
      </div>
    </div>
  );
}

export default Main;

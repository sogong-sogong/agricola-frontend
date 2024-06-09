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
import useInquiryData from "../hook/useInquiryData";

function Main({ ipAddress, portNum }) {
  const {
    updateGameResources,
    setScore,
    updateUserResources,
    stompClient,
    roomnumber,
    setRoomnumber,
    gameStart,
    setGameStart,
    currentShowUser,
    setCurrentShowUser,
    memberId,
  } = useResources();
  const {
    farmData,
    houseData,
    cageData,
    setCageData,
    inquiryFarm,
    inquiryHouse,
    inquiryCage,
  } = useInquiryData();

  const [userInfos, setUserInfos] = useState([]); // 플레이어 4명의 ID, number, starter 저장
  const [familyPosition, setFamilyPosition] = useState([]); // 플레이어 4명의 위치 저장

  // 테스트 함수
  const test = () => {
    inquiryCage(1);
    console.log(houseData);
  };

  const [visibleButtons, setVisibleButtons] = useState(
    new Set([32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45])
  );
  const [familyCount, setFamilyCount] = useState(0); // 가족 몇 명이 행동판에 올라갔는지 센다.

  const myID = findMemberInfo(memberId).number; // 자신의 number

  const [familyID, setFamilyID] = useState([]);

  function findMemberInfo(memberId) {
    const memberInfo = userInfos.find((member) => member.memberId === memberId);
    return memberInfo
      ? memberInfo
      : `Member with memberId ${memberId} not found`;
  }

  // 웹소켓 구독 함수
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

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
      console.log("연결 해제됨");
    }
  };

  // 웹소켓 방 입장 데이터 전송 코드
  const sendData = () => {
    if (!stompClient.current || !stompClient.current.connected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};

    const dataToSend = {
      memberId: memberId,
    };

    // 데이터 전송
    console.log("데이터 전송:", dataToSend);
    stompClient.current.send(
      `/pub/room/${roomnumber}`,
      {},
      JSON.stringify(dataToSend)
    );
  };

  // 공동창고를 조회하고 데이터를 업데이트 하는 함수
  const inquiryCommonstorage = async () => {
    // 공동창고 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/commonstorage/${roomnumber}`
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      //console.log(data); // 전송받은 데이터 콘솔 출력
      updateGameResources(data);
    }
  };

  // 웹소켓 공동 창고 업데이트
  const sendCommonstorageData = (data) => {
    if (!stompClient.current || !stompClient.current.connected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};
    /*
    const dataToSend = {
      roomId: {
        id: roomnumber,
      },
      wood: 47,
      clay: 18,
    };
    */

    // 데이터 전송
    console.log("데이터 전송:", data);
    stompClient.current.send(
      `/pub/room/${roomnumber}/common/update`,
      {},
      JSON.stringify(data)
    );
  };

  // 가족 위치를 가져오는 함수
  const inquiryFamilyPosition = async () => {
    // 가족 위치 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/family/get/${roomnumber}`
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      //console.log(data); // 전송받은 데이터 콘솔 출력
      setFamilyPosition(data);
      // 빈 배열이 리턴되면 재귀적으로 함수를 다시 호출한다.
      if (Array.isArray(data) && data.length === 0) {
        inquiryFamilyPosition();
      }
    }
  };

  // 가족 위치 업데이트 함수
  const updateFamilyPosition = async (id, xy) => {
    // 가족 위치 업데이트 API 호출
    if (!stompClient.current || !stompClient.current.connected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};

    const dataToSend = [
      {
        id: id, //familyId
        xy: xy, //family 위치
      },
    ];
    // 데이터 전송
    console.log("가족 위치 변경 데이터 전송:", dataToSend);
    stompClient.current.send(
      `/pub/room/${roomnumber}/family/position/update`,
      {},
      JSON.stringify(dataToSend)
    );

    //console.log(Number(memberIdRef.current));
  };

  // 가족 위치 초기화 함수
  const initializeFamilyPosition = async () => {
    // 가족 위치 업데이트 API 호출
    if (!stompClient.current || !stompClient.current.connected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }
    const dataToSend = [];

    familyPosition.forEach((item) => {
      const data = [
        { id: item.family[0].id, xy: 6 },
        { id: item.family[1].id, xy: 11 },
      ];
      dataToSend.push(...data);
    });

    console.log(dataToSend);

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};

    // 데이터 전송
    console.log("데이터 전송:", dataToSend);
    stompClient.current.send(
      `/pub/room/${roomnumber}/family/position/update`,
      {},
      JSON.stringify(dataToSend)
    );

    //console.log(Number(memberIdRef.current));
  };

  // 전체 유저 점수 현황을 가져오는 함수
  const inquiryScore = async () => {
    // 점수 현황 조회 API 호출
    const fetchData = async () => {
      const urls = [
        `http://${ipAddress}:${portNum}/score/member/${userInfos[0].memberId}`,
        `http://${ipAddress}:${portNum}/score/member/${userInfos[1].memberId}`,
        `http://${ipAddress}:${portNum}/score/member/${userInfos[2].memberId}`,
        `http://${ipAddress}:${portNum}/score/member/${userInfos[3].memberId}`,
      ];
      try {
        const responses = await Promise.all(urls.map((url) => axios.get(url)));
        const data = responses.map((response) => response.data);
        setScore(data.flat());
        return data.flat();
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      //console.log(data); // 전송받은 데이터 콘솔 출력
    }
  };

  // 농장 데이터 업데이트 함수
  // 업데이트 후 inquiryFarm을 실행한다.
  const updateFarmData = async (create, id, type, xy, crop) => {
    let data = {};

    if (create) {
      data = {
        type: type,
        xy: xy,
        crop: crop,
      };
    } else {
      data = {
        id: id,
        type: type,
        xy: xy,
        crop: crop,
      };
    }

    const farmData = data;
    console.log(farmData);

    // PUT 요청을 보내는 내부 함수
    const sendData = async () => {
      try {
        const res = await axios.put(
          `http://${ipAddress}:${portNum}/farm/member/${Number(memberId)}`,
          farmData
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const response = await sendData();
    if (response) {
      console.log("Updated farm data:", response); // 서버로부터 받은 응답 데이터를 콘솔에 출력
      inquiryFarm(memberId);
    }
  };

  // 집 데이터 업데이트 함수
  const updateHouseData = async (create, id, type, xy, stock_type) => {
    let data = {};

    if (create) {
      data = {
        type: type,
        xy: xy,
        stock_type: stock_type,
      };
    } else {
      data = {
        id: id,
        type: type,
        xy: xy,
        stock_type: stock_type,
      };
    }
    const houseData = data;
    // PUT 요청을 보내는 내부 함수
    const sendData = async () => {
      try {
        const res = await axios.put(
          `http://${ipAddress}:${portNum}/house/member/${Number(memberId)}`,
          houseData
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const response = await sendData();
    if (response) {
      console.log("Updated house data:", response); // 서버로부터 받은 응답 데이터를 콘솔에 출력
      inquiryHouse(memberId);
    }
  };

  // 우리 데이터 업데이트 함수
  const updateCageData = async (create, id, type, stock, xy, stock_cnt) => {
    let data = {};

    if (create) {
      data = {
        type: type,
        stock: stock,
        xy: xy,
        stock_cnt: stock_cnt,
      };
    } else {
      data = {
        id: id,
        type: type,
        stock: stock,
        xy: xy,
        stock_cnt: stock_cnt,
      };
    }

    const cageData = data;
    console.log(cageData);

    // PUT 요청을 보내는 내부 함수
    const sendData = async () => {
      try {
        const res = await axios.put(
          `http://${ipAddress}:${portNum}/cage/member/${Number(memberId)}`,
          cageData
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        setCageData([]);
        return null;
      }
    };

    const response = await sendData();
    if (response) {
      console.log("Updated cage data:", response); // 서버로부터 받은 응답 데이터를 콘솔에 출력
      inquiryCage(memberId);
    }
  };

  // 내 자원창고 put 업데이트
  const sendUserData = async ({ data, update = true }) => {
    //console.log(data);

    // 쿼리 문자열 생성
    const queryParams = Object.entries(data)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    // PUT 요청을 보내는 내부 함수
    const sendData = async () => {
      const url = `http://${ipAddress}:${portNum}/storage/update/${Number(
        memberId
      )}?${queryParams}`;

      try {
        const res = await axios.put(url);
        console.log("데이터 전송:", res.data);
        // 응답 데이터가 유효하다면 다음 단계를 수행합니다.
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const response = await sendData();
    if (response) {
      console.log("Updated data:", response); // 서버로부터 받은 응답 데이터를 콘솔에 출력

      if (update) {
        updateUserResources(response);
      }
    }
  };

  // 개인 자원 조회 함수
  // update가 false이면, 조회만 한다.
  const inquiryUserStorage = async ({ id, n = 10, update = true }) => {
    // 개인 자원 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/storage/${id}`
        );
        return res.data;
      } catch (error) {
        // 조회가 안 될 경우 최대 n의 횟수만큼 재귀적으로 호출한다.
        if (n > 0) {
          inquiryUserStorage({ id: id, n: n - 1, update: update });
        } else {
          console.error("Error", error);
        }
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log(`User ${id} storage`, data); // 전송받은 데이터 콘솔 출력
      if (update) {
        updateUserResources(data);
      }

      return data;
    }
  };

  // 턴 업데이트 함수
  const updateTurn = async (id) => {
    // 턴 업데이트 API 호출
    if (!stompClient.current || !stompClient.current.connected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};

    const dataToSend = {
      starter: id,
    };
    // 데이터 전송
    console.log("데이터 전송:", dataToSend);
    stompClient.current.send(
      `/pub/room/${roomnumber}/starter/update`,
      {},
      JSON.stringify(dataToSend)
    );
  };

  // 라운드 업데이트 함수
  const updateRound = async () => {
    // 라운드 업데이트 API 호출
    if (!stompClient.current || !stompClient.current.connected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};

    // 데이터 전송
    console.log("라운드 업데이트 전송");
    stompClient.current.send(`/pub/room/${roomnumber}/round/update`, {});
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
  }, []);

  // roomnumber가 설정될 때 connect 함수 호출
  // roomnumber가 설정될 때 공동창고 자원 초기화
  // roomnumber가 설정될 때 가족 초기 위치를 가져온다.
  useEffect(() => {
    if (roomnumber) {
      connect(); // connect가 프로미스를 반환한다고 가정
      inquiryCommonstorage();
      inquiryFamilyPosition();
      inquiryUserStorage({ id: memberId, update: true });

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
      if (item.memberId === memberId) {
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
              memberId={memberId}
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
                memberId={memberId}
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
                memberId={memberId}
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
          memberId={memberId}
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

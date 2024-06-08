import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";

import styles from "./Main.module.css";

import ActBoard from "../components/ActBoard";
import HomeBoard from "../components/HomeBoard";
import CardBoard from "../components/CardBoard";
import LogBoard from "../components/LogBoard";

import { useResources } from "../context/ResourceContext";

function Main() {
  const [farmData, setFarmData] = useState([]);
  const [houseData, setHouseData] = useState([]);
  const [cageData, setCageData] = useState([]);

  const [roomnumber, setRoomnumber] = useState(); // 방 번호
  const [userInfos, setUserInfos] = useState([]); // 플레이어 4명의 ID, number, starter 저장
  const [familyPosition, setFamilyPosition] = useState([]); // 플레이어 4명의 위치 저장

  const [currentShowUser, setCurrentShowUser] = useState(0);

  // 멤버 ID를 저장하는 Ref
  const memberIdRef = useRef();

  const myID = findMemberInfo(Number(memberIdRef.current)).number; // 자신의 number

  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef(null);

  const { updateGameResources, setScore, updateUserResources } = useResources();

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
      () => new WebSocket("ws://localhost:8080/ws-stomp")
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
            setUserInfos(newMessage);

            //inquiryFamilyPosition();
          } else if (newMessage.id !== undefined) {
            console.log("메시지 경로", `/pub/room/${roomnumber}/common/update`);
            updateGameResources(newMessage);
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
      memberId: memberIdRef.current,
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
          `http://localhost:8080/commonstorage/${roomnumber}`
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
  const sendCommonstorageData = () => {
    if (!stompClient.current || !stompClient.current.connected) {
      console.error("STOMP 연결이 설정되지 않았습니다.");
      return;
    }

    // 디버그 출력을 비활성화하는 빈 함수 설정
    stompClient.current.debug = () => {};

    const dataToSend = {
      roomId: {
        id: roomnumber,
      },
      wood: 47,
      clay: 18,
    };

    // 데이터 전송
    console.log("데이터 전송:", dataToSend);
    stompClient.current.send(
      `/pub/room/${roomnumber}/common/update`,
      {},
      JSON.stringify(dataToSend)
    );
  };

  // 가족 위치를 가져오는 함수
  const inquiryFamilyPosition = async () => {
    // 가족 위치 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/family/get/${roomnumber}`
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
        `http://localhost:8080/score/member/${userInfos[0].memberId}`,
        `http://localhost:8080/score/member/${userInfos[1].memberId}`,
        `http://localhost:8080/score/member/${userInfos[2].memberId}`,
        `http://localhost:8080/score/member/${userInfos[3].memberId}`,
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

  // 밭 조회 함수
  const inquiryFarm = async (id) => {
    // 밭 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/farm/member/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error", error);
        // 데이터를 받지 못하면 farm data를 빈 배열로 설정한다.
        setFarmData([]);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log("farm", data); // 전송받은 데이터 콘솔 출력
      setFarmData(data);
    }
  };

  // 집 조회 함수
  const inquiryHouse = async (id) => {
    // 집 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/house/member/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log("house", data); // 전송받은 데이터 콘솔 출력
      setHouseData(data);
    }
  };

  // 우리 조회 함수
  const inquiryCage = async (id) => {
    // 우리 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/cage/member/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log("cage", data); // 전송받은 데이터 콘솔 출력
      setCageData(data);
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
          `http://localhost:8080/farm/member/${Number(memberIdRef.current)}`,
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
      inquiryFarm(Number(memberIdRef.current));
    }
  };

  // 집 데이터 업데이트 함수
  const updateHouseData = async (id, type, xy, stock_type) => {
    // 예시 데이터 형식
    const houseData = {
      id: id,
      type: type,
      xy: xy,
      stock_type: stock_type,
    };

    // PUT 요청을 보내는 내부 함수
    const sendData = async () => {
      try {
        const res = await axios.put(
          `http://localhost:8080/house/member/${Number(memberIdRef.current)}`,
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
      inquiryHouse(Number(memberIdRef.current));
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
          `http://localhost:8080/cage/member/${Number(memberIdRef.current)}`,
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
      inquiryCage(Number(memberIdRef.current));
    }
  };

  // 내 자원창고 put 업데이트
  const sendUserData = async (data) => {
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
      const url = `http://localhost:8080/storage/update/${Number(
        memberIdRef.current
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

      updateUserResources(response);
    }
  };

  // 테스트 함수
  const test = () => {
    // 가족 초기 위치 가져오기
    //updateFarmData(true, 2, 1, 1, 1);
    //inquiryFamilyPosition();
    sendUserData({ pig: 1 });
    //updateCageData(true, 0, 0, 0, 8, 0);
    //inquiryHouse();
  };

  // 컴포넌트가 마운트될 때 쿠키에서 방 번호와 멤버 아이디를 가져온다.
  useEffect(() => {
    const savedRoomNumber = Cookies.get("roomnumber");
    if (savedRoomNumber) {
      setRoomnumber(savedRoomNumber);
    }

    const savedMemberId = Cookies.get("memberId");
    if (savedMemberId) {
      memberIdRef.current = savedMemberId;
    }
  }, []);

  // roomnumber가 설정될 때 connect 함수 호출
  // roomnumber가 설정될 때 공동창고 자원 초기화
  // roomnumber가 설정될 때 가족 초기 위치를 가져온다.
  useEffect(() => {
    if (roomnumber) {
      connect(); // connect가 프로미스를 반환한다고 가정
      inquiryCommonstorage();
      inquiryFamilyPosition();
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
  }, [userInfos]);

  return (
    <div className={styles.container}>
      <div className={styles.leftBoard}>
        <div className={styles.header}>
          <div className={styles.text} onClick={test}>
            ROOM #{roomnumber}
          </div>
        </div>
        <div className={styles.gameBoard}>
          <div className={styles.actBoard}>
            <ActBoard
              roomnumber={roomnumber}
              memberId={Number(memberIdRef.current)}
              inquiryFamilyPosition={inquiryFamilyPosition}
              updateFamilyPosition={updateFamilyPosition}
              userInfos={userInfos}
              familyPosition={familyPosition}
              sendCommonstorageData={sendCommonstorageData}
              sendUserData={sendUserData}
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
                memberId={Number(memberIdRef.current)}
                updateCageData={updateCageData}
              />
            </div>

            <div className={styles.cardBoard}>
              <CardBoard />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logBoard}>
        <LogBoard
          memberId={Number(memberIdRef.current)}
          userInfos={userInfos}
          inquiryScore={inquiryScore}
          familyPosition={familyPosition}
          setCurrentShowUser={setCurrentShowUser}
          myID={myID}
          farmData={farmData}
          inquiryFarm={inquiryFarm}
          inquiryHouse={inquiryHouse}
          inquiryCage={inquiryCage}
        />
      </div>
    </div>
  );
}

export default Main;

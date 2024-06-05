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
  const [roomnumber, setRoomnumber] = useState(); // 방 번호
  const [userInfos, setUserInfos] = useState([]); // 플레이어 4명의 ID, number, starter 저장
  const [familyPosition, setFamilyPosition] = useState([]);

  // 멤버 ID를 저장하는 Ref
  const memberIdRef = useRef();

  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef(null);

  const { updateGameResources, setScore } = useResources();

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
          } else if (newMessage.id !== undefined) {
            console.log("메시지 경로", `/pub/room/${roomnumber}/common/update`);
            updateGameResources(newMessage); // 공동자원 업데이트
          } else {
            console.log("undefined message....");
          }
        });
        // 연결되면 send
        sendData();
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
  /*
  function findMemberInfo(memberId) {
    const memberInfo = userInfos.find((member) => member.memberId === memberId);
    return memberInfo
      ? memberInfo
      : `Member with memberId ${memberId} not found`;
  }
  */

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
      console.log(data); // 전송받은 데이터 콘솔 출력
      setFamilyPosition(data);
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
  const inquiryFarm = async () => {
    // 밭 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/farm/member/${Number(memberIdRef.current)}`
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log(data); // 전송받은 데이터 콘솔 출력
    }
  };

  // 집 조회 함수
  const inquiryHouse = async () => {
    // 집 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/house/member/${Number(memberIdRef.current)}`
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log(data); // 전송받은 데이터 콘솔 출력
    }
  };

  // 우리 조회 함수
  const inquiryCage = async () => {
    // 우리 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/cage/member/${Number(memberIdRef.current)}`
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log(data); // 전송받은 데이터 콘솔 출력
    }
  };

  // 테스트 함수
  const test = () => {
    //inquiryFarm();
    //inquiryHouse();
    inquiryCage();
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
  // roomnumber가 설정될 때 공동창고 자원을 업데이트 한다.
  // roomnumber가 설정될 때 가족 초기 위치를 가져온다.
  // 가족 초기 위치가 안 가져와져서 test 한번 실행해줘야함,,
  useEffect(() => {
    if (roomnumber) {
      connect();
      inquiryCommonstorage();
      inquiryFamilyPosition();
    }

    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, [roomnumber]);

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
            />
          </div>
          <div className={styles.rightBoard}>
            <div className={styles.homeBoard}>
              <HomeBoard />
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
        />
      </div>
    </div>
  );
}

export default Main;

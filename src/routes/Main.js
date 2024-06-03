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

  // 멤버 ID를 저장하는 Ref
  const memberIdRef = useRef();

  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef(null);

  const { updateGameResources } = useResources();

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
          setUserInfos(newMessage);
        });
        // 연결되면 sendr
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

  // 웹소켓 데이터 전송 코드
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

  function findMemberInfo(memberId) {
    const memberInfo = userInfos.find((member) => member.memberId === memberId);
    return memberInfo
      ? memberInfo
      : `Member with memberId ${memberId} not found`;
  }

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
      console.log(data);
      updateGameResources(data);
    }
  };

  const test = () => {
    //console.log(userInfos);
    //console.log(memberIdRef);
    //console.log(findMemberInfo(Number(memberIdRef.current)));
    inquiryCommonstorage();
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
  useEffect(() => {
    if (roomnumber) {
      connect();
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
            <ActBoard />
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
        />
      </div>
    </div>
  );
}

export default Main;

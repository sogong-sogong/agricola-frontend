import { useState } from "react";
import axios from "axios";

// Custom Hook
const useWebSocket = ({
  stompClient,
  memberId,
  roomnumber,
  familyPosition,
}) => {
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

  return {
    disconnect,
    sendData,
    sendCommonstorageData,
    updateFamilyPosition,
    initializeFamilyPosition,
    updateTurn,
    updateRound,
  };
};

export default useWebSocket;

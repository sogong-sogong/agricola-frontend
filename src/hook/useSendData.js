import { useState } from "react";
import axios from "axios";

// Custom Hook
const useSendData = ({
  ipAddress,
  portNum,
  memberId,
  inquiryFarm,
  inquiryHouse,
  setCageData,
  inquiryCage,
  updateUserResources,
}) => {
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
      inquiryFarm(Number(memberId));
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
      inquiryHouse(Number(memberId));
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
      inquiryCage(Number(memberId));
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
  return { updateFarmData, updateHouseData, updateCageData, sendUserData };
};

export default useSendData;

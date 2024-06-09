import { useState } from "react";
import axios from "axios";

// Custom Hook
const useInquiryData = () => {
  const [farmData, setFarmData] = useState([]);
  const [houseData, setHouseData] = useState([]);
  const [cageData, setCageData] = useState([]);

  // API 호출 주소
  const ipAddress = "localhost";
  //const ipAddress = "172.17.74.133";
  const portNum = "8080";

  // 밭 조회 함수
  const inquiryFarm = async (id, update = true) => {
    // 밭 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/farm/member/${id}`
        );
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
      if (update) {
        setFarmData(data);
      }
      return data;
    }
  };

  // 집 조회 함수
  const inquiryHouse = async (id) => {
    // 집 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/house/member/${id}`
        );
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
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/cage/member/${id}`
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        // 데이터를 받지 못하면 cage data를 빈 배열로 설정한다.
        setCageData([]);
        return null;
      }
    };

    const data = await fetchData();
    if (data) {
      console.log("cage", data); // 전송받은 데이터 콘솔 출력
      setCageData(data);
    }
  };

  return {
    farmData,
    houseData,
    cageData,
    setCageData,
    inquiryFarm,
    inquiryHouse,
    inquiryCage,
  };
};

export default useInquiryData;

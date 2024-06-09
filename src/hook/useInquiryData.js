import { useState } from "react";
import axios from "axios";

// Custom Hook
const useInquiryData = ({
  roomnumber,
  updateUserResources,
  updateGameResources,
  setScore,
  userInfos,
}) => {
  const [farmData, setFarmData] = useState([]);
  const [houseData, setHouseData] = useState([]);
  const [cageData, setCageData] = useState([]);

  const [familyPosition, setFamilyPosition] = useState([]); // 가족 위치 저장

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

  // 공동창고를 조회하고 데이터를 초기화 하는 함수
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

  return {
    farmData,
    houseData,
    cageData,
    setCageData,
    familyPosition,
    setFamilyPosition,
    inquiryFarm,
    inquiryHouse,
    inquiryCage,
    inquiryFamilyPosition,
    inquiryUserStorage,
    inquiryCommonstorage,
    inquiryScore,
  };
};

export default useInquiryData;

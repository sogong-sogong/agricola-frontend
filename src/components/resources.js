// components/resources.js

// ResourceProvider로 변경
import React, { createContext, useState, useContext } from "react";

// Context 생성
const ResourceContext = createContext();

export const initialGameResources = {
  branch: 30,
  seed: 18,
  clay: 18,
  rock: 16,
  reed: 14,
  vegetable: 12,
  sheep: 18,
  pig: 15,
  cow: 13,
  food: 20,
};

export const initialUserResources = {
  branch: 0,
  clay: 0,
  rock: 0,
  reed: 0,
  seed: 0,
  vegetable: 0,
  food: 0,
  beg: 0,
  sheep: 0,
  pig: 0,
  cow: 0,
  mark: 0,
  fence: 0,
  house: 0,
  family: 2,
};

function resources({ children }) {
  return <div></div>;
}

export default resources;

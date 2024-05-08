import React from "react";

function ScoreBoard() {
  return (
    <div>
      <h3>점수 현황</h3>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
                backgroundColor: "#f2f2f2",
              }}
            >
              이름
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
                backgroundColor: "#f2f2f2",
              }}
            >
              점수
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
              }}
            >
              플레이어 1
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
              }}
            >
              100
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
              }}
            >
              플레이어 2
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
              }}
            >
              90
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
              }}
            >
              플레이어 3
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px",
                textAlign: "center",
              }}
            >
              85
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ScoreBoard;

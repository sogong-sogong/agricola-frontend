import React from "react";
import { useTable } from "react-table";

function ScoreBoard() {
  const data = React.useMemo(
    () => [
      {
        category: "밭",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "우리",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "곡식",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "채소",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "양",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "멧돼지",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "소",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "빈칸",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "울타리 친 외양간",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "흙집 방",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "돌집 방",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "가족 구성원",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "구걸 카드",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "카드 점수",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "추가 점수",
        user1: 0,
        user2: 0,
        user3: 0,
      },
      {
        category: "합계",
        user1: 0,
        user2: 0,
        user3: 0,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        accessor: "category",
      },
      {
        Header: "유저1",
        accessor: "user1",
      },
      {
        Header: "유저2",
        accessor: "user2",
      },
      {
        Header: "유저3",
        accessor: "user3",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ height: "10%", borderCollapse: "collapse", fontSize: "10%" }}
    >
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()} style={{ height: "5%" }}>
              {row.cells.map((cell) => (
                <td
                  key={cell.getCellProps().key}
                  {...cell.getCellProps()}
                  style={{
                    width: cell.column.width || "auto",
                    height: "5%",
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ScoreBoard;

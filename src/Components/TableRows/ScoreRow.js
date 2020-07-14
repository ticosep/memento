import React from "react";

const ScoreRow = ({ data, gameTime, score, numOfMementos }) => {
  return (
    <tr>
      <td>{score}</td>
      <td>{numOfMementos}</td>
      <td>{gameTime}</td>
      <td>{data}</td>
    </tr>
  );
};

export default ScoreRow;

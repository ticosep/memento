import moment from "moment";
import React from "react";
import styled from "styled-components";

const PreviewImg = styled.img`
  width: 250px;
  height: 200px;

  object-fit: contain;
`;

const PriviewVideo = styled.video`
  width: 250px;
  height: 200px;

  object-fit: contain;
`;

const MementoRow = ({ type, data, desc, url }) => {
  let preview;
  console.log(type);

  if (type.includes("image")) {
    preview = <PreviewImg src={url} alt="lembrança" />;
  }

  if (type.includes("video")) {
    preview = <PriviewVideo controls src={url} />;
  }
  return (
    <tr>
      <td>{preview}</td>
      <td>{desc}</td>
      <td>{moment(data, "YYYY-MM-DD").format("DD/MM/YYYY")}</td>
    </tr>
  );
};

export default MementoRow;

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

  if (type === "img") {
    preview = <PreviewImg src={url} alt="lembrança" />;
  }

  if (type === "video") {
    preview = <PriviewVideo controls src={url} />;
  }
  return (
    <tr>
      <td>{preview}</td>
      <td>{desc}</td>
      <td>{data}</td>
    </tr>
  );
};

export default MementoRow;

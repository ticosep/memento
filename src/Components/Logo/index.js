import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
`;

const Title = styled.span`
  font-size: 1.2rem;
`;

const index = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon size="2x" icon={faBrain} />
      <Title>Memento</Title>
    </Wrapper>
  );
};

export default index;

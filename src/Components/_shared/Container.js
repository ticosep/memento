import styled from "styled-components";

import { mediaQuery } from "../../utils/mediaQuery";

export const Container = styled.div`
  @media ${mediaQuery.md} {
    margin-left: auto;
    margin-right: auto;
    max-width: 550px;
  }

  @media ${mediaQuery.lg} {
    max-width: 1280px;
  }
`;

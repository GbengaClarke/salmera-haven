import styled from "styled-components";
import { media } from "./breakpoints";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $justify = "left" }) => $justify};
  /* border: 1px solid red; */
  gap: ${({ $gap = "1rem" }) => $gap};

  ${media.mobile} {
    gap: ${({ $gapMobile = "1.5rem" }) => $gapMobile};
  }
`;

function FlexAlign({ justify, gap, gapMobile, children }) {
  return (
    <FlexContainer $justify={justify} $gapMobile={gapMobile} $gap={gap}>
      {children}
    </FlexContainer>
  );
}

export default FlexAlign;

import styled from "styled-components";
import { media } from "./breakpoints";

const ImageContainer = styled.div`
  height: ${({ height = "3rem" }) => height};
  width: ${({ width = "3rem" }) => width};
  border-radius: 100%;
  overflow: hidden;

  ${media.laptopsm} {
    height: 3.5rem;
    width: 3.5rem;
  }
`;

function ImageResuseable({ height, width, children }) {
  return (
    <ImageContainer height={height} width={width}>
      {children}
    </ImageContainer>
  );
}

export default ImageResuseable;

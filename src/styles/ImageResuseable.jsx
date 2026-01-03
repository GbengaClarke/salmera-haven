import styled from "styled-components";

const ImageContainer = styled.div`
  /* background-color: gray; */
  /* border: 1px solid red; */
  height: ${({ height = "3rem" }) => height};
  width: ${({ width = "3rem" }) => width};
  /* box-shadow: ${({ shadow }) => shadow}; */
  border-radius: 100%;
  overflow: hidden;
`;

function ImageResuseable({ height, width, children }) {
  return (
    <ImageContainer height={height} width={width}>
      {children}
    </ImageContainer>
  );
}

export default ImageResuseable;

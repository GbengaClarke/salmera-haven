import styled from "styled-components";
import ImageResuseable from "../styles/ImageResuseable";
import { media } from "../styles/breakpoints";

const GenralContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;
const Avatar = styled.img`
  object-fit: cover;
  height: 100%;
`;

const AvatarInfo = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  font-size: 0.5rem;
  color: var(--color-grey-600);

  & div {
    font-size: 0.7rem;
    color: var(--color-grey-500);
  }

  ${media.tabletsm} {
    display: flex;
  }
`;

function AvatarDetails() {
  return (
    <GenralContainer>
      <ImageResuseable height={"2.8rem"} width={"2.8rem"}>
        <Avatar src="/placeholderpic.webp" alt="user avatar" />
      </ImageResuseable>

      <AvatarInfo>
        <h1>Samuel Nwaokocha</h1>
        <div>samuelnwaokocha@gmail.com</div>
      </AvatarInfo>
    </GenralContainer>
  );
}

export default AvatarDetails;

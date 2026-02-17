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
    font-family: "Raleway", sans-serif;
    color: var(--color-grey-500);
  }

  ${media.tabletsm} {
    display: flex;
  }
`;

function AvatarDetails({ user }) {
  // console.log(user);

  const { fullName, email, avatar } = user;
  return (
    <GenralContainer>
      <ImageResuseable height={"2.8rem"} width={"2.8rem"}>
        {/* add defualt guest avatar */}
        <Avatar
          src={avatar || "/default-user.jpg"}
          alt={`${fullName}'s avatar`}
        />
      </ImageResuseable>

      <AvatarInfo>
        <h1>{fullName}</h1>
        <div>{email}</div>
      </AvatarInfo>
    </GenralContainer>
  );
}

export default AvatarDetails;

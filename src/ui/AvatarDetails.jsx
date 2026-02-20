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
  width: 100%;
`;

const AvatarInfo = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  font-size: 0.5rem;
  color: var(--color-grey-600);

  & p {
    font-size: 0.8rem;
    font-family: "Raleway", sans-serif;
    color: var(--color-grey-500);
  }

  ${media.tabletsm} {
    display: flex;

    & p {
      font-size: 1rem;
    }
  }

  ${media.laptopsm} {
    font-size: 0.7rem;

    & p {
      font-size: 1.1rem;
    }
  }
`;

function AvatarDetails({ user }) {
  const { fullName, email, avatar } = user;
  return (
    <GenralContainer>
      <ImageResuseable height={"2.9rem"} width={"2.9rem"}>
        <Avatar
          src={avatar || "/default-user.jpg"}
          alt={`${fullName}'s avatar`}
        />
      </ImageResuseable>

      <AvatarInfo>
        <h1>{fullName}</h1>
        <p>{email}</p>
      </AvatarInfo>
    </GenralContainer>
  );
}

export default AvatarDetails;

import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import UsersForm from "../features/authentication/UsersForm";
import {
  Divider,
  InfoCard,
  RowFlex,
  StyledTableContainer,
} from "./SettingsContainer";

function UsersContainer() {
  return (
    <StyledTableContainer>
      <RowFlex>
        <Heading as={"h2"}>Create a new user</Heading>

        <p>
          Add a team member to your platform. Once created, they will receive an
          email verification link to complete their account setup and access the
          system.
        </p>
      </RowFlex>

      <Divider />

      <InfoCard>
        <h4>Welcome aboard!</h4>
        <p>
          Once a new account is created, the user will receive guidance to
          complete their profile and familiarize themselves with the platform.
          They will be able to access the dashboard, explore features, and begin
          managing bookings and other activities right away.
        </p>
      </InfoCard>

      <Row>
        <UsersForm />
      </Row>
    </StyledTableContainer>
  );
}

export default UsersContainer;

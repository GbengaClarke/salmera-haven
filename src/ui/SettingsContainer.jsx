import styled from "styled-components";
import Row from "../styles/Row";
import Heading from "../styles/Heading";
import SettingsForm from "../features/settings/SettingsForm";

export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 70rem;
  gap: 2.5rem;
`;

export const RowFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: left;

  & h2 {
    color: var(--color-grey-700);
  }

  & p {
    font-size: 1.4rem;
    color: var(--color-grey-500);
    max-width: 60ch;
    line-height: 1.6;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: var(--color-grey-200);
  width: 100%;
`;

export const InfoCard = styled.div`
  background: var(--color-grey-100);
  padding: 1.6rem 2rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);

  & h4 {
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
    color: var(--color-grey-700);
  }

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-500);
    line-height: 1.6;
  }
`;

function SettingsContainer() {
  return (
    <StyledTableContainer>
      <RowFlex>
        <Heading as={"h2"}>Settings</Heading>

        <p>
          Configure how bookings behave across your property. These settings
          apply to all future reservations and help you control operational
          limits.
        </p>
      </RowFlex>

      <Divider />

      <InfoCard>
        <h4>Why these settings matter</h4>
        <p>
          Adjusting limits like maximum nights or guest capacity ensures better
          resource planning, improves guest experience, and helps you stay on
          track with your revenue goals.
        </p>
      </InfoCard>

      <Row>
        <SettingsForm />
      </Row>
    </StyledTableContainer>
  );
}

export default SettingsContainer;

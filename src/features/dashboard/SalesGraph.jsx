import styled from "styled-components";

import { RowFlex } from "../../ui/BookingsTableContainer";
import Row from "../../styles/Row";
import Heading from "../../styles/Heading";
import Spinner from "../../ui/Spinner";
import RevenueChart from "./RevenueChart";

const StyledDiv = styled.div`
  grid-column: span 2;

  width: 100%;
  /* height: 30rem; */
  background: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;
`;
function SalesGraph({ bookings = [], isGettingBookings }) {
  return (
    <StyledDiv>
      <RowFlex>
        <Row>
          <Heading as="h3">Revenue from </Heading>
        </Row>
      </RowFlex>

      {isGettingBookings ? <Spinner /> : <RevenueChart />}
    </StyledDiv>
  );
}

export default SalesGraph;

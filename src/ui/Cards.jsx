import styled, { keyframes } from "styled-components";
import { media } from "../styles/breakpoints";
import { HiCurrencyDollar, HiOutlineCalendarDays } from "react-icons/hi2";
import { FaBed, FaSuitcaseRolling } from "react-icons/fa";
import { formatCurrency } from "../utils/helpers";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const Skeleton = styled.div`
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    var(--color-grey-100) 25%,
    var(--color-grey-200) 37%,
    var(--color-grey-100) 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;

  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $width }) => $width && `width: ${$width};`}
`;

const CardContentWrapper = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledCards = styled.div`
  display: flex;
  gap: 1rem;

  @media (min-width: 872px) {
    overflow-x: auto;
    justify-content: space-between;
    width: 100%;
    margin-inline: auto;
  }
  /* @media (min-width: 872px) {
    overflow-x: auto;
    justify-content: space-between;
    width: 100%;
    margin-inline: auto;
  } */

  ${media.laptopsm} {
    gap: 2rem;
  }

  @media (min-width: 730px) and (max-width: 840px) {
    gap: 0.6rem;
    overflow-x: auto;
    justify-content: space-between;
    width: 100%;
    margin-inline: auto;
  }
`;

const CardContainer = styled.div`
  width: 16rem;
  height: 10rem;
  margin-left: 0.3rem;
  margin-top: 0.2rem;

  background: ${({ $bColor }) =>
    `linear-gradient(
      to right,
      ${$bColor} 0%,
      ${$bColor} 30%,
      transparent 100%
    )`};

  border-radius: 9px;
  overflow: hidden;
  outline: 1px solid #72727226;
  transition: all 0.25s ease;

  @media (min-width: 730px) and (max-width: 840px) {
    width: 14.99rem;
  }

  @media (min-width: 872px) {
    flex: 1;
    width: 20rem;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 0.5rem;
  color: var(--color-grey-700);
  padding: 1rem;

  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  background-color: var(--color-grey-0);

  & p {
    font-size: 1.5rem;
  }

  & span {
    font-size: 1.2rem;
    color: var(--color-grey-500);

    @media (min-width: 730px) and (max-width: 840px) {
      font-size: 1rem;
      white-space: nowrap;
    }

    ${media.laptoplg} {
      font-size: 1.3rem;
    }
  }
`;

const CardRow = styled.div`
  gap: 0.4rem;
  margin-bottom: auto;
  font-weight: 500;
  display: flex;
  align-items: center;

  color: ${({ $bColor }) => $bColor};

  & p {
    color: ${({ $bColor }) => $bColor};
    white-space: nowrap;

    @media (min-width: 730px) and (max-width: 840px) {
      font-size: 1.2rem;
    }
  }
`;

function Cards({
  scheduledTodayCount,
  bookings,
  lastDays,
  roomsCount,
  confirmedStays,
  isLoading,
}) {
  const { revenue, highest, unconfirmed } = bookings.reduce(
    (acc, curr) => {
      acc.revenue += curr.totalPrice;
      acc.highest = Math.max(acc.highest, curr.totalPrice);
      acc.unconfirmed += curr.status === "unconfirmed" ? 1 : 0;
      return acc;
    },
    { revenue: 0, highest: 0, unconfirmed: 0 }
  );

  const occupation =
    confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) /
    (lastDays * roomsCount);

  return (
    <StyledCards>
      <CardContainer $bColor="var(--color-blue-700)">
        <Card>
          <CardRow $bColor="var(--color-blue-700)">
            <HiOutlineCalendarDays />
            <p>Total Bookings</p>
          </CardRow>

          <CardContentWrapper>
            {isLoading ? (
              <>
                <Skeleton $height="1.6rem" $width="3rem" />
                <Skeleton $height="1rem" $width="7rem" />
              </>
            ) : (
              <>
                <strong>{bookings.length}</strong>
                <span>
                  {scheduledTodayCount > 0
                    ? scheduledTodayCount === 1
                      ? `${scheduledTodayCount} arrival today`
                      : `${scheduledTodayCount} arrivals today`
                    : "No arrival today"}
                </span>
              </>
            )}
          </CardContentWrapper>
        </Card>
      </CardContainer>

      <CardContainer $bColor="var(--color-brand-mint)">
        <Card>
          <CardRow $bColor="var(--color-brand-mint)">
            <HiCurrencyDollar />
            <p>Total Revenue</p>
          </CardRow>

          <CardContentWrapper>
            {isLoading ? (
              <>
                <Skeleton $height="1.6rem" $width="6rem" />
                <Skeleton $height="1rem" $width="8rem" />
              </>
            ) : (
              <>
                <strong>{formatCurrency(revenue)}</strong>
                <span>Highest sale {formatCurrency(highest)}</span>
              </>
            )}
          </CardContentWrapper>
        </Card>
      </CardContainer>

      <CardContainer $bColor="var(--color-red-700)">
        <Card>
          <CardRow $bColor="var(--color-red-700)">
            <FaSuitcaseRolling />
            <p>Check ins</p>
          </CardRow>

          <CardContentWrapper>
            {isLoading ? (
              <>
                <Skeleton $height="1.6rem" $width="3rem" />
                <Skeleton $height="1rem" $width="6rem" />
              </>
            ) : (
              <>
                <strong>{confirmedStays?.length}</strong>
                <span>{unconfirmed} unconfirmed</span>
              </>
            )}
          </CardContentWrapper>
        </Card>
      </CardContainer>

      <CardContainer $bColor="var(--color-janquil-500)">
        <Card>
          <CardRow $bColor="var(--color-janquil-500)">
            <FaBed />
            <p>Occupancy Rate</p>
          </CardRow>

          <CardContentWrapper>
            {isLoading ? (
              <>
                <Skeleton $height="1.6rem" $width="4rem" />
                <Skeleton $height="1rem" $width="9rem" />
              </>
            ) : (
              <>
                <strong>
                  {occupation ? Math.round(occupation * 100) + "%" : "0%"}
                </strong>
                <span>In the last {lastDays} days</span>
              </>
            )}
          </CardContentWrapper>
        </Card>
      </CardContainer>
    </StyledCards>
  );
}

export default Cards;

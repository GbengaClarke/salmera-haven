import styled from "styled-components";
// import { CommonRow } from "../../ui/TableContext";

import { formatCurrency, getToday } from "../../utils/helpers";
import { HiArrowDownTray } from "react-icons/hi2";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { isSameDay } from "date-fns";
import { GiAirplaneArrival, GiCommercialAirplane } from "react-icons/gi";
import useGetTodayBookingOverview from "../dashboard/useGetTodayBookingOverview";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useCheckoutBooking from "./useCheckoutBooking";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledInfo = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.7rem 0;
`;
const StyledChecking = styled.button`
  background-color: var(--color-brand-500);
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;

  &:hover {
    background-color: var(--color-brand-600);
  }
`;

const StyledRoom = styled.div`
  font-weight: 500;
`;

const StyledDirection = styled.span`
  border-radius: 3rem;
  padding: 0.4rem 0.8rem;
  gap: 0.3rem;
  color: var(--color-grey-700);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  background-color: ${({ $isArriving }) =>
    $isArriving === "true"
      ? "var(--color-brand-mint)"
      : "var(--color-silver-100)"};
  /* background-color: green; */
  width: max-content;
  height: auto;
`;

const ImageCont = styled.div`
  width: 2.3rem;
  height: 1.5rem;
  overflow: hidden;
  border-radius: 3px;
  background-color: var(--color-grey-100);
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  color: var(--color-grey-600);
  align-items: center;
  text-align: left;
  padding: 0.6rem;
  /* border: 1px solid red; */
  cursor: pointer;

  &:nth-child(odd) {
    background-color: inherit;
  }

  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-200);
  }
  &:active {
    background-color: var(--color-grey-300);
  }
`;

function TodaysOverviewRow({ booking }) {
  const navigate = useNavigate();

  const { checkoutBooking, isCheckingout, errorCheckingout } =
    useCheckoutBooking();

  const {
    guest: { countryFlag, fullName },
    room: { name },
    id,
    startDate,
  } = booking;

  const today = getToday();

  const isArriving = isSameDay(new Date(startDate), new Date(today));

  return (
    <CommonRow
      onClick={(e) => {
        if (e.target.closest("button")) return;
        navigate(`bookings/${id}`);
      }}
      columns="0.25fr 1fr 2fr .8fr .7fr"
    >
      <ImageCont>
        <Img src={countryFlag} alt={`country flag`} />
      </ImageCont>

      <div>
        {fullName} #{id}
      </div>

      {!isArriving ? (
        <StyledInfo>
          <StyledDirection $isArriving={String(isArriving)}>
            Departing <GiCommercialAirplane />
          </StyledDirection>{" "}
          5-night stay
        </StyledInfo>
      ) : (
        <StyledInfo>
          <StyledDirection $isArriving={String(isArriving)}>
            Arriving <GiAirplaneArrival />
          </StyledDirection>{" "}
          for 5-night stay
        </StyledInfo>
      )}

      <StyledRoom>Room {name}</StyledRoom>

      {isArriving ? (
        <StyledChecking onClick={() => navigate(`/bookings/${id}/checkin`)}>
          Check in
        </StyledChecking>
      ) : (
        <Modal>
          <Modal.Open openFor="confirmCheckout">
            <StyledChecking
              onClick={(e) => {
                if (e.target.closest("button")) return;
              }}
            >
              Check out
            </StyledChecking>
          </Modal.Open>

          <Modal.Window openFor="confirmCheckout">
            <ConfirmDelete
              resourceName={fullName}
              onConfirm={(e) => {
                e?.stopPropagation?.();
                checkoutBooking({ id: id, status: "checked-out" });
              }}
              disabled={false}
              message={"confirmCheckout"}
            />
          </Modal.Window>
        </Modal>
      )}
    </CommonRow>
  );
}
{
  /* <TbDoorExit /> */
}

export default TodaysOverviewRow;

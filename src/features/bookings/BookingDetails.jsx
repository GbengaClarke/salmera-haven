import styled, { css } from "styled-components";
import { format } from "date-fns";
import { IoMdLogOut } from "react-icons/io";
import { LuMapPinCheckInside, LuUser } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  Outlet,
  useMatch,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import BookingDataBox from "./BookingDataBox";
import { statusStyles } from "./BookingRow";
import useGetSingleBooking from "./useGetSingleBooking";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import useCheckoutBooking from "./useCheckoutBooking";
import { media } from "../../styles/breakpoints";

const PageWrapper = styled.section`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderCard = styled.div`
  background: var(--color-grey-100);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 1px rgba(0, 0, 100, 0.1);
  border: 1px solid var(--color-grey-100);
  transition: all 0.25s ease;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.mobile} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-brand-600);

    ${media.tabletsm} {
      font-size: 2.2rem;
    }
  }

  span {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 3px;
    justify-content: center;

    color: var(--color-grey-500);

    ${media.mobile} {
      justify-content: left;
    }
  }

  ${media.mobile} {
    gap: 2rem;
  }
`;

const StyledStatusBackContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    gap: 1.3rem;
    margin-bottom: -1rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  min-width: 27rem;
  max-width: 45rem;
  margin-inline: auto;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-grey-700);

  text-transform: uppercase;
  ${({ $statusStyles, status }) => $statusStyles[status]};

  ${media.mobile} {
    min-width: auto;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  margin-top: 1.5rem;
  width: max-content;
  margin-inline: auto;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-grey-600);
  cursor: pointer;

  &:hover {
    color: var(--color-brand-600);
  }
  &:focus {
    outline: none;
  }

  ${media.mobile} {
    margin-top: auto;
  }
`;

const Card = styled.div`
  background: var(--color-grey-0);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-100);
  transition: all 0.25s ease;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  min-width: 160px;
  padding: 1rem 1.4rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.4rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: 0.2s ease;

  svg {
    font-size: 1.6rem;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: var(--color-brand-600);
  color: white;

  &:hover {
    background: var(--color-brand-500);
  }
`;

const DangerButton = styled(ActionButton)`
  background: var(--color-red-100);
  color: var(--color-red-700);

  &:hover {
    background: var(--color-red-700);
    color: var(--color-red-100);
  }

  &:focus {
    outline: none;
    opacity: 0.8;
  }

  ${media.mobile} {
    ${({ $isCheckedOut }) =>
      !$isCheckedOut &&
      css`
        margin: auto;
        max-width: 30rem;
      `}
  }
`;

function BookingDetails() {
  const { booking = {}, isGettingSingleBooking } = useGetSingleBooking();
  const { checkoutBooking } = useCheckoutBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const isCheckIn = useMatch(`/bookings/:id/checkin`);
  const { scrollToTop } = useOutletContext();

  if (isGettingSingleBooking) return <Spinner />;

  const {
    id,
    status,
    created_at,
    guest: { fullName },
  } = booking;

  return (
    <PageWrapper>
      <HeaderCard>
        <TitleBlock>
          <h2>Booking ID #{id}</h2>
          <span>
            <LuUser /> {fullName}
          </span>
        </TitleBlock>

        <StyledStatusBackContainer>
          <StatusBadge $statusStyles={statusStyles} status={status}>
            {status}
          </StatusBadge>

          <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        </StyledStatusBackContainer>
      </HeaderCard>

      <Card>
        <BookingDataBox booking={booking} />
        <p
          style={{
            marginTop: "1.6rem",
            fontSize: "1.2rem",
            color: "var(--color-grey-500)",
          }}
        >
          Booked on{" "}
          {created_at && format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </Card>

      <Outlet context={{ booking, isCheckIn, navigate, scrollToTop }} />

      {!isCheckIn && (
        <Card>
          <Modal>
            <ActionsWrapper>
              {status === "checked-in" && (
                <Modal.Open openFor="confirmCheckout">
                  <PrimaryButton>
                    <IoMdLogOut />
                    Check Out
                  </PrimaryButton>
                </Modal.Open>
              )}

              {status === "unconfirmed" && (
                <PrimaryButton
                  onClick={() => navigate(`/bookings/${id}/checkin`)}
                >
                  <LuMapPinCheckInside />
                  Check In
                </PrimaryButton>
              )}

              <Modal.Open openFor="confirmDelete">
                <DangerButton
                  disabled={isDeleting}
                  $isCheckedOut={status === "checked-in"}
                >
                  <MdOutlineDeleteOutline />
                  Delete Booking
                </DangerButton>
              </Modal.Open>
            </ActionsWrapper>

            <Modal.Window openFor="confirmCheckout">
              <ConfirmDelete
                resourceName={fullName}
                onConfirm={(e) => {
                  e?.stopPropagation?.();
                  checkoutBooking(
                    { id: id, status: "checked-out", fullName },
                    {
                      onSuccess: () => {
                        navigate("/");

                        scrollToTop();
                      },
                    }
                  );
                }}
                disabled={false}
                message={"confirmCheckout"}
              />
            </Modal.Window>

            <Modal.Window openFor="confirmDelete">
              <ConfirmDelete
                resourceName="booking"
                onConfirm={() => {
                  deleteBooking(id, {
                    onSettled: () => {
                      navigate(-1);
                      scrollToTop();
                    },
                  });
                }}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Card>
      )}
    </PageWrapper>
  );
}

export default BookingDetails;

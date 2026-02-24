import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { LuMapPinCheckInside } from "react-icons/lu";
import { media } from "../../styles/breakpoints";
// import { ButtonText, ModalActions } from "./BookingDetails";
import { useForm } from "react-hook-form";
import useCheckinBooking from "./useCheckinBooking";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card } from "./BookingDetails";

const Container = styled.section`
  /* overflow: hidden; */
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  padding: 2rem;

  ${media.mobile} {
    justify-content: flex-start;
  }
`;

const ButtonText = styled.button`
  background: none;
  border: none;
  /* color: var(--color-brand-600); */
  color: var(--color-grey-600);
  padding: 1rem 1.4rem;
  background-color: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  margin-left: auto;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: var(--color-brand-400);
  }
`;

const StyledDiv = styled.div`
  /* padding: 2rem 3.2rem; */
  /* border-top: 1px solid var(--color-grey-100); */
  font-size: 1.3rem;
  font-weight: 500;
  text-align: left;
  color: var(--color-grey-500);
  /* border: 1px solid var(--color-grey-100); */
  /* box-shadow: var(--shadow-md); */
  /* border-radius: var(--border-radius-md); */
  display: flex;
  gap: 1rem;
  align-items: center;
  /* background-color: var(--color-grey-0); */
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  padding: 1rem 1.4rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 1.3rem;

  border: none;
  cursor: pointer;

  width: auto;
  min-width: 12rem;
  white-space: nowrap;

  background-color: var(--color-grey-100);
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-200);
  }

  svg {
    font-size: 1.6rem;
  }

  ${media.tabletsm} {
    font-size: 1.4rem;
    padding: 1.1rem 1.6rem;
  }
`;

const PrimaryAction = styled(ActionButton)`
  background-color: var(--color-brand-600);
  color: white;

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const StyledError = styled.span`
  font-size: 1.2rem;
  color: #d22626;

  opacity: ${({ $error }) => ($error ? "1" : "0")};
  pointer-events: none;

  transition: opacity 0.25s ease;
`;

function Checkin() {
  const { booking, isCheckIn, navigate, scrollToTop } = useOutletContext();

  const {
    id,
    hasBreakfast,
    totalPrice,
    extraPrice,
    roomPrice,
    isPaid,
    numNights,
    numGuests,
    status,
    guest: { fullName },
  } = booking;

  //load value from supabase??
  const placeholderBreakfastCost = 10; //10 dollars extraPrice

  const [wantBreakfast, setWantBreakfast] = useState(hasBreakfast);
  // const [hasPaid, setHasPaid] = useState();

  const { checkinBooking, isCheckingIn } = useCheckinBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const newExtraPrice = !hasBreakfast
    ? numNights * ((numGuests + 1) * placeholderBreakfastCost)
    : 0;

  const newTotalPrice = roomPrice + newExtraPrice;

  function onSubmit(data) {
    if (!data.confirmPayment) return;

    const values = {
      isPaid: true,
      status: "checked-in",
    };

    if (wantBreakfast !== hasBreakfast) {
      values.hasBreakfast = wantBreakfast;
      values.extraPrice = wantBreakfast ? newExtraPrice : 0;
      values.totalPrice = wantBreakfast ? roomPrice + newExtraPrice : roomPrice;
    }

    checkinBooking(
      { id, values, fullName },
      {
        onSuccess: () => {
          navigate("/");
          scrollToTop?.();
        },
      }
    );
  }

  function onError(errors) {
    if (errors?.confirmPayment) {
      toast.error(errors.confirmPayment.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Container>
        <Card>
          <StyledDiv>
            <input
              checked={wantBreakfast}
              onChange={(e) => setWantBreakfast(e.target.checked)}
              type="checkbox"
              id="breakfast"
              disabled={isCheckingIn || (isPaid && hasBreakfast)}
            />
            <label htmlFor="breakfast">
              I want breakfast served{" "}
              {!hasBreakfast && `(+${formatCurrency(newExtraPrice)})`}
              {extraPrice > 1 &&
                hasBreakfast &&
                `(+${formatCurrency(extraPrice)})`}
            </label>
          </StyledDiv>
        </Card>
        <Card>
          <StyledDiv>
            <input
              disabled={isCheckingIn}
              type="checkbox"
              id="confirmPayment"
              {...register("confirmPayment", {
                required: "Payment must be confimed before checking in.",
              })}
            />

            <label htmlFor="confirmPayment">
              I confirm that {fullName} has paid the total amount of{" "}
              {wantBreakfast && !hasBreakfast && (
                <span>
                  {formatCurrency(newTotalPrice)} ({formatCurrency(roomPrice)} +{" "}
                  {formatCurrency(newExtraPrice)})
                </span>
              )}
              {hasBreakfast && wantBreakfast ? (
                <span>
                  {formatCurrency(totalPrice)} ({formatCurrency(roomPrice)} +{" "}
                  {formatCurrency(extraPrice)}){" "}
                  <span style={{ color: "red", marginBottom: "20rem" }}>
                    {" "}
                    *
                  </span>
                </span>
              ) : (
                !wantBreakfast && (
                  <span>
                    {formatCurrency(totalPrice - extraPrice)}
                    <span style={{ color: "red", marginBottom: "20rem" }}>
                      {" "}
                      *
                    </span>
                  </span>
                )
              )}
            </label>

            <StyledError $error={errors?.confirmPayment ? true : false}>
              {/* {errors?.confirmPayment?.message} */}
            </StyledError>
          </StyledDiv>
        </Card>
      </Container>

      <ModalActions>
        <PrimaryAction type="submit">
          <LuMapPinCheckInside />
          <span>Check In Booking </span>
        </PrimaryAction>
        <ButtonText type="button" onClick={() => navigate(-1)}>
          Back
        </ButtonText>
      </ModalActions>
    </form>
  );
}

export default Checkin;

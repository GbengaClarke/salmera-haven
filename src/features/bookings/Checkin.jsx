import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { LuMapPinCheckInside } from "react-icons/lu";
import { media } from "../../styles/breakpoints";
import { ButtonText, ModalActions } from "./BookingDetails";
import { useForm } from "react-hook-form";
import useCheckinBooking from "./useCheckinBooking";
import { formatCurrency, getNumberOfNights } from "../../utils/helpers";
import { useState } from "react";

const Container = styled.section`
  overflow: hidden;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledDiv = styled.div`
  padding: 2rem 3.2rem;
  border-top: 1px solid var(--color-grey-100);
  font-size: 1.2rem;
  color: var(--color-grey-500);
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: var(--color-grey-0);
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
  const { booking, isCheckIn, navigate } = useOutletContext();

  const {
    id,
    hasBreakfast,
    totalPrice,
    extraPrice,
    roomPrice,
    isPaid,
    numNights,
    numGuests,
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

  //after change: when hasBreakfast was initially false
  const newExtraPrice = !hasBreakfast
    ? numNights * ((numGuests + 1) * placeholderBreakfastCost)
    : 0;

  const newTotalPrice = roomPrice + newExtraPrice;

  // function onSubmit(data) {
  //   if (!data.confirmPayment) return;

  //   let checkinData;

  //   if (wantBreakfast && !hasBreakfast) {
  //     checkinData = {
  //       id: id,
  //       values: {
  //         isPaid: true,
  //         hasBreakfast: wantBreakfast,
  //         totalPrice: newTotalPrice,
  //         extraPrice: newExtraPrice,
  //         status: "checked-in",
  //       },
  //     };

  //     // console.log("HB", wantBreakfast);
  //     // console.log("TP", newTotalPrice);
  //     // return console.log("EP", newExtraPrice);
  //   } else if (!wantBreakfast && hasBreakfast) {
  //     checkinData = {
  //       id: id,
  //       values: {
  //         isPaid: true,
  //         hasBreakfast: wantBreakfast,
  //         totalPrice: newTotalPrice,
  //         extraPrice: newExtraPrice,
  //         status: "checked-in",
  //       },
  //     };

  //     //extra price was ZERO in the former working code

  //     // console.log("HB", wantBreakfast);
  //     // console.log("TP", newTotalPrice);
  //     // return console.log("EP", 0);
  //   } else {
  //     // console.log("HB", hasBreakfast);
  //     // console.log("TP", totalPrice);
  //     // console.log("EP", extraPrice);

  //     checkinData = {
  //       id: id,
  //       values: {
  //         isPaid: true,
  //         hasBreakfast: hasBreakfast,
  //         status: "checked-in",
  //       },
  //     };
  //   }

  //   // console.log(checkinData.values);

  //   checkinBooking(checkinData, {
  //     onSuccess: () => navigate("/bookings"),
  //   });
  // }

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
      { id, values },
      {
        onSuccess: () => navigate("/bookings"),
      }
    );

    // console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <StyledDiv>
          {/* <input
            defaultChecked={hasBreakfast}
            onClick={() => setWantBreakfast(!wantBreakfast)}
            type="checkbox"
            id="breakfast"
            {...register("hasBreakfast")}
            disabled={isCheckingIn || (isPaid && hasBreakfast)}
          /> */}
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

        <StyledDiv>
          <input
            disabled={isCheckingIn}
            type="checkbox"
            id="confirmPayment"
            {...register("confirmPayment", {
              required: "* You must confirm payment before check-in.",
            })}
          />

          <label htmlFor="confirmPayment">
            i confirm that {fullName} has paid the total amount of{" "}
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
              </span>
            ) : (
              !wantBreakfast && (
                <span>{formatCurrency(totalPrice - extraPrice)}</span>
              )
            )}
          </label>

          <StyledError $error={errors?.confirmPayment ? true : false}>
            {errors?.confirmPayment?.message}
          </StyledError>
        </StyledDiv>
      </Container>

      <ModalActions>
        <PrimaryAction type="submit">
          <LuMapPinCheckInside />
          <span>Check in booking #{id}</span>
        </PrimaryAction>
        <ButtonText type="button" onClick={() => navigate(-1)}>
          Back
        </ButtonText>
      </ModalActions>
    </form>
  );
}

export default Checkin;

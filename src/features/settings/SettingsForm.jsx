import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// import GlobalStyles, { media } from "./GlobalStyles";
import { media } from "../../styles/breakpoints";
import FormRow from "../../ui/FormElements";
import { Button } from "../../ui/Button";
import useGetSettings from "./useGetSettings";
import useUpdateSettings from "./useUpdateSettings";

const Container = styled.div`
  width: 100%;
  /* max-width: 600px; */
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sd);

  ${media.tabletsm} {
    padding: 3rem;
  }

  ${media.laptoplg} {
    max-width: 800px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & div {
    text-align: left;
  }
`;

function BookingForm() {
  //load settings from supabase and place as default values
  const {
    isGettingSettings,
    settings = {},
    errorGettingSettings,
  } = useGetSettings();

  const { updateSetting, errorUpdatingSettings, isUpdatingSettings } =
    useUpdateSettings();

  const isWorking = isGettingSettings || isUpdatingSettings;

  const {
    id,
    breakfastPrice,
    maxActiveBookingsPerGuest,
    maxGuests,
    maxBookingLength,
  } = settings;

  // console.log(settings);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maxBookingLength: maxBookingLength,
      maxGuests: maxGuests,
      maxActiveBookingsPerGuest: maxActiveBookingsPerGuest,
      breakfastPrice: breakfastPrice,
    },
  });

  useEffect(() => {
    if (!settings) return;

    reset({
      maxBookingLength,
      maxGuests,
      maxActiveBookingsPerGuest,
      breakfastPrice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, settings]);

  const onSubmit = (data) => {
    const update = {
      id,
      values: data,
    };

    updateSetting(update);
  };

  return (
    // <>
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label={"Maximum nights per booking"}
          error={errors?.maxBookingLength?.message}
        >
          <input
            disabled={isWorking}
            type="number"
            id="maxBookingLength"
            {...register("maxBookingLength", {
              valueAsNumber: true,
              required: "This field is required",
              min: { value: 1, message: "Minimum 1 night" },
            })}
          />
        </FormRow>

        <FormRow
          label={"Maximum guests per booking"}
          error={errors?.maxGuests?.message}
        >
          <input
            disabled={isWorking}
            type="number"
            id="maxGuests"
            {...register("maxGuests", {
              valueAsNumber: true,
              required: "This field is required",
              min: { value: 1, message: "Minimum 1 night" },
            })}
          />
        </FormRow>

        <FormRow
          label={"Maximum active bookings per guest"}
          error={errors?.maxActiveBookingsPerGuest?.message}
        >
          <input
            disabled={isWorking}
            type="number"
            id="maxActiveBookingsPerGuest"
            {...register("maxActiveBookingsPerGuest", {
              valueAsNumber: true,
              min: { value: 1, message: "Minimum 1 night" },
            })}
          />
        </FormRow>

        <FormRow
          label={"Breakfast price (per guest / per night)"}
          error={errors?.breakfastPrice?.message}
        >
          <input
            disabled={isWorking}
            type="number"
            id="breakfastPrice"
            {...register("breakfastPrice", { valueAsNumber: true })}
          />
        </FormRow>

        <Button disabled={isWorking} type="submit">
          {isWorking ? "Saving..." : "Save Settings"}
        </Button>
      </Form>
    </Container>
    // </>
  );
}

export default BookingForm;

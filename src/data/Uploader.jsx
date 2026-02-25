import { useEffect, useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { supabase } from "../services/supabase";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// --- API FUNCTIONS ---

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log("Delete Bookings Error:", error.message);
}

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log("Delete Guests Error:", error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("rooms").delete().gt("id", 0);
  if (error) console.log("Delete Rooms Error:", error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log("Create Guests Error:", error.message);
}

async function createCabins() {
  const { error } = await supabase.from("rooms").insert(cabins);
  if (error) console.log("Create Rooms Error:", error.message);
}

async function createBookings() {
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((guest) => guest.id);

  const { data: cabinsIds } = await supabase
    .from("rooms")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.roomId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const roomPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extraPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = roomPrice + extraPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      roomPrice,
      extraPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      roomId: allCabinIds.at(booking.roomId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log("Create Bookings Error:", error.message);
}

// Global lock to prevent race conditions (double uploads)
let isGlobalUploading = false;

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    if (isGlobalUploading) return;
    isGlobalUploading = true;
    setIsLoading(true);

    try {
      console.log("🔄 Starting database refresh...");

      // 1. DELETE SEQUENTIALLY (Bookings first)
      await deleteBookings();
      await deleteGuests();
      await deleteCabins();

      // Buffer to allow DB to process deletions
      await new Promise((res) => setTimeout(res, 500));

      // 2. CREATE SEQUENTIALLY
      await createGuests();
      await createCabins();
      await createBookings();

      // 3. UPDATE DB TIMESTAMP
      await supabase
        .from("internal_settings")
        .upsert({ key: "last_upload_time", value: new Date().toISOString() });

      console.log("✅ Database successfully reset and re-seeded.");
    } catch (err) {
      console.error("❌ Critical error during auto-upload:", err.message);
    } finally {
      setIsLoading(false);
      isGlobalUploading = false;
    }
  }

  useEffect(() => {
    async function checkAndUpload() {
      if (isGlobalUploading) return;

      const { data } = await supabase
        .from("internal_settings")
        .select("value")
        .eq("key", "last_upload_time")
        .single();

      const lastUpload = data?.value;
      const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

      if (
        !lastUpload ||
        Date.now() - new Date(lastUpload).getTime() > TWO_DAYS_MS
      ) {
        await uploadAll();
      }
    }

    checkAndUpload();
  }, []);

  return null;

  /* // Commented out buttons for manual use if ever needed:
  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </button>

      <button onClick={() => {
        setIsLoading(true);
        deleteBookings().then(createBookings).finally(() => setIsLoading(false));
      }} disabled={isLoading}>
        Upload bookings ONLY
      </button>
    </div>
  );
  */
}

export default Uploader;

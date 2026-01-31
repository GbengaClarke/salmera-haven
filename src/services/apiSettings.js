import { supabase } from "./supabase";

export async function getSettings() {
  const { data: settings, error } = await supabase
    .from("settings")
    .select(
      "id,maxBookingLength,maxGuests,maxActiveBookingsPerGuest,breakfastPrice"
    )
    .single();

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  return settings;
}

export async function updateSetting(object) {
  const { data, error } = await supabase
    .from("settings")
    .update(object.values)
    .eq("id", object.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Setting could not be saved");
  }
}

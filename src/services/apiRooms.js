import { supabase } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  return data;
}

export async function addRoom(formData) {
  const image = formData.image[0];

  //upload image
  const imageName = `${Math.random()}-${image.name}`;

  const { error: errorImage } = await supabase.storage
    .from("room-pictures")
    .upload(imageName, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (errorImage) {
    console.error(errorImage);
    throw new Error("Room's picture could not be uploaded");
  }

  const { data: imagePathData } = supabase.storage
    .from("room-pictures")
    .getPublicUrl(imageName);

  const imagePath = imagePathData.publicUrl;

  const { data, error } = await supabase
    .from("rooms")
    .insert([{ ...formData, image: imagePath }])
    .select();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A room with this name already exists");
    }
    console.error(error);
    throw new Error("Room could not be added");
  }

  return data;
}

export async function uploadRoomImage(image) {
  const imageName = `${Math.random()}-${image.name}`;

  const { error: errorImage } = await supabase.storage
    .from("room-pictures")
    .upload(imageName, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (errorImage) {
    console.error(errorImage);
    throw new Error("Room's picture could not be uploaded");
  }

  const { data } = supabase.storage
    .from("room-pictures")
    .getPublicUrl(imageName);

  console.log(data.publicUrl);

  return data.publicUrl;
}

// https://cpdwazwtvjpogpwizqis.supabase.co/storage/v1/object/public/room-pictures/close-up-laptop-with-lock-chain.webp

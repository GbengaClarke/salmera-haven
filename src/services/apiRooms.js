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

export async function deleteRoom(roomId) {
  const { error } = await supabase.from("rooms").delete().eq("id", roomId);
  // .select()
  // .single();

  if (error) {
    console.error(error);
    throw new Error("Room could not be deleted");
  }
}

export async function duplicateRoom(roomId) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  const { id, ...duplicateData } = data;

  // console.log(duplicateData);

  const { error: errorDuplicating } = await supabase
    .from("rooms")
    .insert([{ ...duplicateData, name: `Copy of ${duplicateData.name}` }])
    .select();

  if (errorDuplicating) {
    console.error(errorDuplicating);
    throw new Error("Room could not be duplicated");
  }
}

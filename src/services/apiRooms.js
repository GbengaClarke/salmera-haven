import { supabase } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }

  return data;
}

async function uploadRoomImage(imageFile) {
  const imageName = `${Math.random()}-${imageFile.name}`;

  const { error } = await supabase.storage
    .from("room-pictures")
    .upload(imageName, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error("Room's picture could not be uploaded");
  }

  const { data } = supabase.storage
    .from("room-pictures")
    .getPublicUrl(imageName);

  return data.publicUrl;
}

export async function addEditRoom({ formData, id }) {
  const image = formData.image[0];

  let imagePath = formData.image;

  if (formData.image instanceof FileList) {
    imagePath = await uploadRoomImage(image);
  }

  const payload = {
    ...formData,
    image: imagePath,
  };

  let query = supabase.from("rooms");

  if (id) {
    query = query.update(payload).eq("id", id);
  } else {
    query = query.insert([payload]);
  }

  const { error } = await query.select();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A room with this name already exists");
    }

    throw new Error(
      id ? "Room could not be edited" : "Room could not be added"
    );
  }

  //upload image
  // const imageName = `${Math.random()}-${image.name}`;

  // const { error: errorImage } = await supabase.storage
  //   .from("room-pictures")
  //   .upload(imageName, image, {
  //     cacheControl: "3600",
  //     upsert: false,
  //   });

  // if (errorImage) {
  //   console.error(errorImage);
  //   throw new Error("Room's picture could not be uploaded");
  // }

  // const { data: imagePathData } = supabase.storage
  //   .from("room-pictures")
  //   .getPublicUrl(imageName);

  // const imagePath = imagePathData.publicUrl;

  //add full room
  // if (!id) {
  //   const { data, error } = await supabase
  //     .from("rooms")
  //     .insert([{ ...formData, image: imagePath }])
  //     .select();

  //   if (error) {
  //     if (error.code === "23505") {
  //       throw new Error("A room with this name already exists");
  //     }
  //     console.error(error);
  //     throw new Error("Room could not be added");
  //   }
  // }

  // //edit room
  // if (id) {
  //   const imageX =
  //     typeof formData.image === "string" ? formData.image : imagePath;

  //   const { data, error } = await supabase
  //     .from("rooms")
  //     .update({ ...formData, image: imageX })
  //     .eq("id", id)
  //     .select();

  //   if (error) {
  //     console.error(error);
  //     throw new Error("Room could not be edited");
  //   }
  // }

  // return data;
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

export async function duplicateRoom(duplicateData) {
  const { error: errorDuplicating } = await supabase
    .from("rooms")
    .insert([duplicateData])
    .select();

  if (errorDuplicating) {
    console.error(errorDuplicating);
    throw new Error("Room could not be duplicated");
  }
}

export async function editRoom(object) {
  const { data, error } = await supabase
    .from("rooms")
    .update(object.values)
    .eq("id", object.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Room could not be edited");
  }
}

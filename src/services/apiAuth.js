import { supabase } from "./supabase";

export async function signupUser({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  // console.log(data.user);

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173",
    },
  });

  if (error) throw new Error(error.message);

  // console.log(data);
}

export async function updateUser({ fullName, avatar, password }) {
  let avatarUrl;

  if (avatar?.[0]) {
    const file = avatar[0];
    const fileName = `avatar-${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    avatarUrl = supabase.storage.from("avatars").getPublicUrl(fileName)
      .data.publicUrl;
  }

  let query;

  if (password) {
    query = supabase.auth.updateUser({ password });
  }

  if (fullName || avatarUrl) {
    query = supabase.auth.updateUser({
      data: {
        ...(fullName && { fullName }),
        ...(avatarUrl && { avatar: avatarUrl }),
      },
    });
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}

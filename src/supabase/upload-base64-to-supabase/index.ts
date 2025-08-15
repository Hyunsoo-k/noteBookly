import supabaseClient from "@/supabase/supabase-client";
import base64ToBlob from "@/supabase/base64-to-blob";
import generateUniqueFilename from "@/supabase/generage-unique-filename";

const uploadBase64Image = async (base64: string): Promise<string> => {
  const blob = base64ToBlob(base64);
  const filename = generateUniqueFilename();

  const { error } = await supabaseClient.storage
    .from("notebookly-storage")
    .upload(filename, blob);

  if (error) {
    console.error("Upload error:", error);
  }

  const { data } = supabaseClient.storage
    .from("notebookly-storage")
    .getPublicUrl(filename);
    const imageUrl = data.publicUrl;

  return imageUrl;
};

export default uploadBase64Image;

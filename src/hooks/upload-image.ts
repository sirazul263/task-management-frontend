export const uploadImage = async (image: File) => {
  const cloudName = "daztrxb2p";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "task-management"); // Replace with your upload preset
  formData.append("cloud_name", cloudName); // Replace with your Cloudinary cloud name

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace your_cloud_name
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data;
};

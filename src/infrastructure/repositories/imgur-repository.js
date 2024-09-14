import { IMGUR_CLIENT_ID, IMGUR_API_URL } from "@/shared/constants";

export default class ImgurRepository {
  async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(IMGUR_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return { link: null, error: errorResponse.data.error };
      }

      const result = await response.json();
      if (result.success) {
        return { link: result.data.link, error: null };
      } else {
        return { link: null, error: result.data.error };
      }
    } catch (error) {
      return { link: null, error: "An error occurred during the upload." };
    }
  }
}
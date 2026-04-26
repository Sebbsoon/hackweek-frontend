declare global {
  type UserGallery = {
    id: string;
    user_id: string;
    title: string;
    display_image_url?: string;
    images?: Image[];
    description?: string;
  };
  type Image = {
    id: string;
    gallery_id: string;
    url: string;
    title?: string;
  };
  type User = {
    id: string;
    username: string;
    galleries: UserGallery[];
    profile_picture_url: string;
    description: string;
  };
  type CreateGalleryPayload = {
    title: string;
    description?: string;
    images?: unknown[];
    user_id?: string;
  };
}
export {};

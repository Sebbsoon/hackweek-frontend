declare global {
  type UserGallery = {
    id: string;
    userId: string;
    title: string;
    displayImageUrl?: string;
    images?: Image[];
    description?: string;
  };
  type Image = {
    id: string;
    galleryId: string;
    url: string;
    title?: string;
  };
  type User = {
    id: string;
    clerkUserId: string;
    username: string;
    firstName: string;
    lastName: string;
    galleries: UserGallery[];
    profilePictureUrl: string;
    description?: string;
  };
  type CreateGalleryPayload = {
    title: string;
    description?: string;
    images?: unknown[];
    userId?: string;
  };
}
export {};

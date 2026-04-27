const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://hackweek-backend.onrender.com";

function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export async function getGallery(galleryId: string): Promise<UserGallery> {
  const res = await fetch(
    apiUrl(`/api/galleries/${encodeURIComponent(galleryId)}`),
  );
  if (!res.ok)
    throw new Error(`GET /api/galleries/${galleryId} failed: ${res.status}`);
  return (await res.json()) as UserGallery;
}

export async function createGallery(
  gallery: CreateGalleryPayload,
  token?: string,
): Promise<UserGallery> {
  const res = await fetch(apiUrl(`/api/galleries`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(gallery),
  });
  if (!res.ok) throw new Error(`POST /api/galleries failed: ${res.status}`);
  return (await res.json()) as UserGallery;
}
export async function getGalleries(): Promise<UserGallery[]> {
  const res = await fetch(apiUrl(`/api/galleries`));
  if (!res.ok) throw new Error(`/api/galleries failed: ${res.status}`);
  return (await res.json()) as UserGallery[];
}

export async function getUsers(): Promise<User[]> {
  return await fetch(apiUrl(`/api/users`))
  .then((res) => res.json())
  .catch((err) => {
    console.error("Error fetching users:", err);
    throw new Error(`GET /api/users failed: ${err.message}`);
  });
}
export async function getUser(userId: string): Promise<User> {
  const res = await fetch(apiUrl(`/api/users/${encodeURIComponent(userId)}`));
  if (!res.ok) throw new Error(`/api/users/${userId} failed: ${res.status}`);
  return (await res.json()) as User;
}
export async function getUserGalleries(userId: string): Promise<UserGallery[]> {
  const res = await fetch(
    apiUrl(`/api/users/${encodeURIComponent(userId)}/galleries`),
  );
  if (!res.ok)
    throw new Error(`/api/users/${userId}/galleries failed: ${res.status}`);
  return (await res.json()) as UserGallery[];
}

export async function getGalleryImages(galleryId: string): Promise<Image[]> {
  const res = await fetch(
    apiUrl(`/api/galleries/${encodeURIComponent(galleryId)}/images`),
  );
  if (!res.ok)
    throw new Error(`/api/galleries/${galleryId}/images failed: ${res.status}`);
  return (await res.json()) as Image[];
}

export type AddImagePayload = {
  file: File;
  title?: string;
  description?: string;
};

export async function addImageToGallery(
  galleryId: string,
  payload: AddImagePayload,
  token?: string,
): Promise<Image> {
  const formData = new FormData();
  formData.append("file", payload.file);

  if (payload.title) formData.append("title", payload.title);
  if (payload.description) formData.append("description", payload.description);

  const res = await fetch(
    apiUrl(`/api/galleries/${encodeURIComponent(galleryId)}/images`),
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error(
      `POST /api/galleries/${galleryId}/images failed: ${res.status}`,
    );
  }

  return (await res.json()) as Image;
}

export async function deleteImageFromGallery(
  imageId: string,
  token?: string,
): Promise<void> {
  const res = await fetch(
    apiUrl(
      `/api/images/${encodeURIComponent(imageId)}`,
    ),
    {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );
  if (!res.ok)
    throw new Error(
      `DELETE /api/images/${imageId} failed: ${res.status}`,
    );
}

export async function deleteGallery(
  galleryId: string,
  token?: string,
): Promise<void> {
  const res = await fetch(
    apiUrl(`/api/galleries/${encodeURIComponent(galleryId)}`),
    {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );
  if (!res.ok)
    throw new Error(`DELETE /api/galleries/${galleryId} failed: ${res.status}`);
}



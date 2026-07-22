import { getCookie } from "cookies-next";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ErrorBody = Record<string, unknown>;

const isErrorBody = (value: unknown): value is ErrorBody =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getErrorMessage = (errorBody: unknown): string => {
  if (typeof errorBody === "string") {
    return errorBody;
  }

  if (isErrorBody(errorBody)) {
    if (typeof errorBody.message === "string") {
      return errorBody.message;
    }

    if (typeof errorBody.error === "string") {
      return errorBody.error;
    }

    const errorMessages: string[] = [];

    for (const [, value] of Object.entries(errorBody)) {
      if (Array.isArray(value)) {
        errorMessages.push(
          ...value.map((err) =>
            typeof err === "string" ? err : JSON.stringify(err),
          ),
        );
      } else if (typeof value === "string") {
        errorMessages.push(value);
      } else if (typeof value === "object" && value !== null) {
        errorMessages.push(JSON.stringify(value));
      }
    }

    if (errorMessages.length > 0) {
      return errorMessages.join("\n");
    }

    return JSON.stringify(errorBody);
  }

  return JSON.stringify(errorBody);
};

export const baseService = async ({
  endpoint,
  method,
  data = null,
  useToken = true,
  showToastOnError = true,
}: {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: unknown;
  useToken?: boolean;
  showToastOnError?: boolean;
}) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (useToken) {
    const token = getCookie("vendorToken") as string;

    if (token) {
      headers.Authorization = `Token ${token}`;
    }
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: data !== null && data !== undefined ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      let errorMessage = `${response.statusText} (Status: ${response.status})`;

      try {
        const errorBody = await response.json();
        errorMessage = getErrorMessage(errorBody);
      } catch {
        // ignore if not JSON
      }
      throw new Error(errorMessage);
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return await response.json();
    }

    if (
      contentType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ) ||
      contentType.includes("application/vnd.ms-excel")
    ) {
      return await response.blob(); // ✅ handle Excel file
    }

    // fallback → plain text
    return await response.text();
  } catch (error: unknown) {
    if (showToastOnError) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    }
    throw error;
  }
};

export const uploadImage = async (
  file: File,
  type: "image" | "video" = "image",
): Promise<{ path: string; filename: string; type: "image" | "video" }> => {
  try {
    const formData = new FormData();
    formData.append(`${type}`, file);

    const headers: Record<string, string> = {
      Authorization: `Token ${getCookie("senduraToken")}`,
    };

    const response = await fetch(`${API_URL}/files/${type}/`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(
      `Upload error: ${
        error instanceof Error ? error.message : "Unknown error occurred"
      }`,
    );
    throw error;
  }
};

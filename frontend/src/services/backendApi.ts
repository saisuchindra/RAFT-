import { apiClient } from "./apiClient";
import type {
  BackendStatusResponse,
  DeleteKeyResponse,
  GetKeyResponse,
  KeyListResponse,
  SetKeyRequest,
  SetKeyResponse
} from "../types/api";

export async function getBackendStatus(): Promise<BackendStatusResponse> {
  const response = await apiClient.get<BackendStatusResponse>("/");
  return response.data;
}

export async function setKey(request: SetKeyRequest): Promise<SetKeyResponse> {
  const response = await apiClient.post<SetKeyResponse>("/set", request);
  return response.data;
}

export async function getKey(key: string): Promise<GetKeyResponse> {
  const response = await apiClient.get<GetKeyResponse>(`/get/${encodeURIComponent(key)}`);
  return response.data;
}

export async function deleteKey(key: string): Promise<DeleteKeyResponse> {
  const response = await apiClient.delete<DeleteKeyResponse>(
    `/delete/${encodeURIComponent(key)}`
  );
  return response.data;
}

export async function listKeys(): Promise<KeyListResponse> {
  const response = await apiClient.get<KeyListResponse>("/keys");
  return response.data;
}

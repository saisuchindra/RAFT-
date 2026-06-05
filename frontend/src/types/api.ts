export type BackendStatusResponse = {
  name: string;
  phase: string;
  status: string;
};

export type SetKeyRequest = {
  key: string;
  value: string;
};

export type SetKeyResponse = {
  key: string;
  value: string;
  message: string;
};

export type GetKeyResponse = {
  key: string;
  value: string;
};

export type DeleteKeyResponse = {
  key: string;
  deleted: boolean;
  message: string;
};

export type KeyValueItem = {
  key: string;
  value: string;
};

export type KeyListResponse = {
  items: KeyValueItem[];
  count: number;
};

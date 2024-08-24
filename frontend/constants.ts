export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";
export const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS;
export const CREATOR_ADDRESS = import.meta.env.VITE_COLLECTION_CREATOR_ADDRESS;
export const IS_DEV = Boolean(import.meta.env.DEV);
export const VITE_MASTER_ACCOUNTS = import.meta.env.VITE_MASTER_ACCOUNTS;
export const masterAccounts: string[] = VITE_MASTER_ACCOUNTS.split(',');
export const COLLECTION_ADDRESS = "";
export const PRIVATEKEY = import.meta.env.VITE_PRIVATEKEY;
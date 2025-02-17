export const PUBLIC_URL = {
    root: (url = "") => `${url ? url : ""}`,
    home: (query = "") => PUBLIC_URL.root(`/${query}`),
    auth: (url = "") => PUBLIC_URL.root(`/auth/${url}`),
};
export const PRIVATE_URL = {
    root: (url = "") => `${url ? url : ""}`,
    home: (url = "") => PRIVATE_URL.root(`/desk${url}`),
};

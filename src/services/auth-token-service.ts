export const ACCESS_TOKEN = 'accessToken';

export const addToLocalStorage = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN, token);
};

export const addToSessionStorage = (token: string): void => {
    sessionStorage.setItem(ACCESS_TOKEN, token);
};

export const removeFromLocalStorage = (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
};

export const getTokenFromLocalStorage = (): string | null => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
};

export const getTokenFromSessionStorage = (): string | null => {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken;
};

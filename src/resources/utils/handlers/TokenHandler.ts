export const TokenHandler = {
  SetToken: (TheToken: string): void => {
    return localStorage.setItem("token", TheToken);
  },

  GetToken: (): string | null => {
    return localStorage.getItem("token");
  },

  ClearToken: (): void => {
    return localStorage.removeItem("token");
  },
};

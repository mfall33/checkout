import { create } from 'zustand';
// add in persistence for access_token

const useStore = create((set) => ({
    accessToken: '',
    setAccessToken: (token) => set((state) => ({ accessToken: token })),
}));

export default useStore;
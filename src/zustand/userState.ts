import { create } from "zustand";

export interface User {
  user: {
    bgImage: string;
    photoURL: string;
    name: string;
    lastName: string;
    profession: string;
    descr: string;
    university: string;
    dateOfBirthDay: string;
    email: string;
  };
}

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export { useUserStore };

import { create } from "zustand";

//? NEWS MODAL STATE
type NewsModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useNewsModal = create<NewsModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

//? BURGER MENU STATE
type useBurgerState = {
  isOpenBurger: boolean;
  openBurger: () => void;
  closeBurger: () => void;
};

export const useBurger = create<useBurgerState>((set) => ({
  isOpenBurger: false,
  openBurger: () => set({ isOpenBurger: true }),
  closeBurger: () => set({ isOpenBurger: false }),
}));

//? ADMIN SELECT STATE
type useAdminSelectState = {
  isOpenAdminSelect: boolean;
  openCloseAdminSelect: () => void;
};

export const useAdminSelect = create<useAdminSelectState>((set) => ({
  isOpenAdminSelect: false,
  openCloseAdminSelect: () =>
    set((state) => ({
      isOpenAdminSelect: !state.isOpenAdminSelect,
    })),
}));

//? PASSWORD LOGIN EYES STATE
type useLoginEyesState = {
  isOpenEyes: boolean;
  openEyes: () => void;
  closeEyes: () => void;
};

export const useLoginEyes = create<useLoginEyesState>((set) => ({
  isOpenEyes: false,
  openEyes: () => set({ isOpenEyes: true }),
  closeEyes: () => set({ isOpenEyes: false }),
}));

//? PASSWORD REGISTER EYES STATE
type useRegisterEyesState = {
  isOpenEyes: boolean;
  openEyes: () => void;
  closeEyes: () => void;
};

export const useRegisterEyes = create<useRegisterEyesState>((set) => ({
  isOpenEyes: false,
  openEyes: () => set({ isOpenEyes: true }),
  closeEyes: () => set({ isOpenEyes: false }),
}));

//? AGREEMENT STATE
type useAgreementState = {
  isAgreed: boolean;
  toggleAgreement: () => void;
};

export const useAgreement = create<useAgreementState>((set, get) => ({
  isAgreed: false,
  toggleAgreement: () => set({ isAgreed: !get().isAgreed }),
}));

//? ADMIN PASSWORD STATE
type useAdminPasswordState = {
  isAdminPassword: boolean;
  toggleAdminPassword: () => void;
};

export const useAdminPassword = create<useAdminPasswordState>((set, get) => ({
  isAdminPassword: false,
  toggleAdminPassword: () => set({ isAdminPassword: !get().isAdminPassword }),
}));

import { create } from "zustand";

//? NEWS MODAL STATE

type NewsType = {
  id: string;
  title: string;
  image: string;
  descriptions: string[];
  createdAt: string;
  updateAt: string;
};

type NewsModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  selectedNews: NewsType | null;
  setSelectedNews: (news: NewsType | null) => void;
};

export const useNewsModal = create<NewsModalState>((set) => ({
  isOpen: false,
  selectedNews: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, selectedNews: null }),
  setSelectedNews: (news) => set({ selectedNews: news }),
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

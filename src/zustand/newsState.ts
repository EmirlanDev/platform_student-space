import { create } from "zustand";

//? FORM NEWS STATE

interface FormNewsState {
  form: {
    image: string;
    title: string;
    descriptions: string[];
  };
  setField: (field: keyof FormNewsState["form"], value: any) => void;
  resetForm: () => void;
  addDescription: (description: string) => void;
  removeDescription: (index: number) => void;
}

const useFormNews = create<FormNewsState>((set) => ({
  form: {
    image: "",
    title: "",
    descriptions: [],
  },
  setField: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),
  resetForm: () =>
    set({
      form: {
        image: "",
        title: "",
        descriptions: [],
      },
    }),
  addDescription: (description: string) =>
    set((state) => ({
      form: {
        ...state.form,
        descriptions: [...state.form.descriptions, description.trim()],
      },
    })),
  removeDescription: (index: number) =>
    set((state) => ({
      form: {
        ...state.form,
        descriptions: state.form.descriptions.filter((_, i) => i !== index),
      },
    })),
}));

type NewsDescrState = {
  description: string;
  setDescr: (value: string) => void;
  resetDescr: () => void;
};

const useNewsDescr = create<NewsDescrState>((set) => ({
  description: "",
  setDescr: (value) => set(() => ({ description: value })),
  resetDescr: () =>
    set({
      description: "",
    }),
}));

export { useFormNews, useNewsDescr };

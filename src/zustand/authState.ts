import { create } from "zustand";

type FormRegisterStore = {
  form: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    adminCode: string;
  };
  setField: (field: keyof FormRegisterStore["form"], value: string) => void;
  resetForm: () => void;
};

const useFormRegister = create<FormRegisterStore>((set) => ({
  form: {
    name: "",
    lastName: "",
    email: "",
    password: "",
    adminCode: "",
  },
  setField: (field, value) =>
    set((state) => ({ form: { ...state.form, [field]: value } })),
  resetForm: () =>
    set({
      form: { name: "", lastName: "", email: "", password: "", adminCode: "" },
    }),
}));

type FormLoginStore = {
  form: {
    email: string;
    password: string;
  };
  setField: (field: keyof FormLoginStore["form"], value: string) => void;
  resetForm: () => void;
};

const useFormLogin = create<FormLoginStore>((set) => ({
  form: {
    email: "",
    password: "",
  },
  setField: (filed, value) =>
    set((state) => ({ form: { ...state.form, [filed]: value } })),
  resetForm: () => set({ form: { email: "", password: "" } }),
}));

export { useFormRegister, useFormLogin };

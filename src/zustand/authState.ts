import { create } from "zustand";

//! REGISTER

//? FORM REGISTER STATE
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

//? VALID REGISTER STATE

type ValidRegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  agreement?: string;
};

type ValidRegisterState = {
  errors: ValidRegisterErrors;
  setErrors: (errors: ValidRegisterErrors) => void;
  clearError: (field: keyof ValidRegisterErrors) => void;
  resetErrors: () => void;
};

const useValidRegisterState = create<ValidRegisterState>((set) => ({
  errors: {},
  setErrors: (errors) => set({ errors }),
  clearError: (field) =>
    set((state) => {
      const updated = { ...state.errors };
      delete updated[field];
      return { errors: updated };
    }),
  resetErrors: () => set({ errors: {} }),
}));

//! LOGIN

//? FORM LOGIN STATE
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

//? VALID LOGIN STATE
type ValidLoginErrors = {
  email?: string;
  password?: string;
  notFound?: string;
};

type ValidLoginState = {
  errors: ValidLoginErrors;
  setErrors: (errors: ValidLoginErrors) => void;
  clearError: (field: keyof ValidLoginErrors) => void;
  resetErrors: () => void;
};

const useValidLoginState = create<ValidLoginState>((set) => ({
  errors: {},
  setErrors: (errors) => set({ errors }),
  clearError: (field) =>
    set((state) => {
      const updated = { ...state.errors };
      delete updated[field];
      return { errors: updated };
    }),
  resetErrors: () => set({ errors: {} }),
}));

export {
  useFormRegister,
  useFormLogin,
  useValidLoginState,
  useValidRegisterState,
};

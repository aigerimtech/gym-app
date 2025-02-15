import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthState {
  user: User | null;
  existingMembers: User[];
  login: (credentials: { email: string; password: string }) => string;
  logout: () => void;
  register: (newMember: User) => string;
  resetStore: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        existingMembers: [
          { id: 1, name: "Дастан Амиров", email: "dastan.amirov@mail.ru", phone: "+79991234567", password: "password" },
          { id: 2, name: "Амина Азаматовна", email: "amina.azamatovna@mail.ru", phone: "+79876543210", password: "123456" },
        ],

        login: (credentials) => {
          const { existingMembers } = get();
          const user = existingMembers.find(
            (u) => u.email === credentials.email && u.password === credentials.password
          );

          if (user) {
            set({ user });
            return "Вход выполнен успешно!";
          }
          return "Неверный email или пароль!";
        },

        logout: () => {
          set({ user: null });
        },

        register: (newMember) => {
          const { existingMembers } = get();
          const emailExists = existingMembers.some((m) => m.email === newMember.email);
          if (emailExists) {
            return 'Email уже зарегистрирован!';
          }

          const userWithID = { ...newMember, id: existingMembers.length + 1 };
        set({ existingMembers: [...existingMembers, userWithID] });
          return "Регистрация успешна! Теперь выполните вход.";
        },

        resetStore: () => set({ user: null, existingMembers: [] }),
      }),
      { name: "auth-storage" }
    )
  )
);

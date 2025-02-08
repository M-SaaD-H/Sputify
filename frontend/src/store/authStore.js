import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const authStore = (set) => ({
  user: null,
  status: false, // This is auth status -> user is logged in or not
  isAdmin: false,
  // Consider adding a loading state here

  login: (user, isAdmin) => {
    try {
      set(state => ({
        user: user,
        status: true,
        isAdmin: isAdmin
      }));
    } catch (error) {
      console.log('Logging in failed E:', error);
    }
  },

  logout: () => {
    try {
      set(state => ({
        user: null,
        status: false,
        isAdmin: false
      }))
    } catch (error) {
      console.log('Loggin out failed E:', error);
    }
  }
});

const useAuthStore = create(
  devtools(
    persist(authStore, { name: 'auth' })
  )
);

export { useAuthStore };
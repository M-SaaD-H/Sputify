import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { axiosInstance as axios } from "@/lib/axios";

const chatStore = (set) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });

    try {
      const res = await axios.get('/user/get-all-users');

      const users = res.data.data;

      set({ users });

    } catch (error) {
      console.log('Error white users in chat E:', error);
    }

    set({ isLoading: false });
  }
});

const useChatStore = create(
  devtools(
    persist(chatStore, { name: 'chat' })
  )
);

export { useChatStore }
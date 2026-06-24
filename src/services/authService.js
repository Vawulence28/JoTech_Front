import api from "./api";

const authService = {

  register: async (userData) => {
    const res = await api.post(
      "/auth/register",
      userData
    );

    return res.data;
  },

  login: async (credentials) => {
    const res = await api.post(
      "/auth/login",
      credentials
    );

    return res.data;
  },

  getProfile: async () => {
    const res = await api.get(
      "/auth/profile"
    );

    return res.data;
  }

};

export default authService;
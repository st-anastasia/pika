export default function (session) {
  return {
    request: (config) => {
      if (session.isAuthenticated) {
        config.headers.Authorization = `Bearer ${session.user.token}`;
      }
      return config;
    },
  };
}

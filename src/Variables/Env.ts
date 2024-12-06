const Env = {
  /**
   * IS THE COUNT ON PAGE VIEWER TO SHOW PRODUCTS
   */
  itensPerPage: 5,
  /**
   * baseUrl: "http://127.0.0.1:3001/v1"
   */
  baseUrlSecure: "https://backendlinkadosbr-production.up.railway.app/v1",
  // baseUrlSecure: "https://127.0.0.1:4433/v1",
  loginAcessPath: {
    rootAcess: "/auth/root",
    adminAcess: "/auth/admin",
    tryCode: "/auth/code",
  },
};

export default Env;

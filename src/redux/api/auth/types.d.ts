namespace AUTH {
  type registerRes = {
    user: {
      id: string;
      name: string;
      lastName: string;
      photoURL: string;
      email: string;
    };
    token: string;
  };
  type registerReq = {
    name: string;
    lastName: string;
    email: string;
    password: string;
  };
  type loginReq = {
    email: string;
    password: string;
  };
}

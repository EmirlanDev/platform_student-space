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

  type logoutReq = void;
  type logoutRes = {
    message: string;
  };

  type editReq = {
    bgImage: string;
    photoURL: string;
    name: string;
    lastName: string;
    profession: string;
    descr: string;
    university: string;
    dateOfBirthDay: string;
    email: string;
  };
  type editRes = {
    bgImage: string;
    photoURL: string;
    name: string;
    lastName: string;
    profession: string;
    descr: string;
    university: string;
    dateOfBirthDay: string;
    email: string;
  };
}

namespace USER {
  type getUserProfileRes = {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    photoURL: string;
    provider: string;
    profession: string;
    university: string;
    dateOfBirthDay: string;
    descr: string;
    bgImage: string;
    createAt: string;
    updateAt: string;
  };
  type getUserProfileReq = void;
  type getUserByIdRes = {
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
  type getUserByIdReq = string;
  type checkUserRes = { authenticated: boolean };
  type checkUserReq = void;
}

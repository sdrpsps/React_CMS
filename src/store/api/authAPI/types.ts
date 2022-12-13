export interface loginRes {
  data: {
    id: number;
    rid: number;
    username: string;
    mobile: string;
    email: string;
    token: string;
  } | null;
  meta: {
    msg: string;
    status: number;
  };
}

export interface loginData {
  username: string;
  password: string;
}

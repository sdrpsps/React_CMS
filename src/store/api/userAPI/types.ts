export interface userListRes {
  data: Data;
  meta: Meta;
}

interface Meta {
  msg: string;
  status: number;
}

interface Data {
  total: number;
  pagenum: number;
  users: User[];
}

 export interface User {
  id: number;
  role_name: string;
  username: string;
  create_time: number;
  mobile: string;
  email: string;
  mg_state: boolean;
}

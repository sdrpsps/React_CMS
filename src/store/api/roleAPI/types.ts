export interface roleTree {
  data: roleData[];
  meta: Meta;
}

interface Meta {
  msg: string;
  status: number;
}

export interface roleData {
  id: number;
  roleName: string;
  roleDesc: string;
  children: roleTreeData[];
}

export interface roleTreeData {
  id: number;
  authName: string;
  path: string;
  children: Child2[];
}

interface Child2 {
  id: number;
  authName: string;
  path: string;
  children: Child[];
}

interface Child {
  id: number;
  authName: string;
  path: string;
}
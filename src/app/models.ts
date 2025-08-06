export interface SimpleUser {
  id: number;
  username: string;
  employee?: { fullName: string; };
}

export interface User {
  id: number;
  username: string;
  roles: string[];
}

export interface RequestHistory {
  statusName: string;
  changeDate: string;
  author: SimpleUser;
}

export interface AccessRequest {
  id: number;
  user: SimpleUser;
  serviceName: string;
  roleName: string;
  requestDate: string;
  history: RequestHistory[];
  lastStatus: string;
}

export interface Service {
  id: number;
  serviceName: string;
  type: string;
}

export interface Role {
  id: number;
  roleName: string;
}

export interface RequestAccessFormData {
  roles: Role[];
  services: Service[];
}

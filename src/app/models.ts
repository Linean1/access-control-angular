export interface User {
  id: number;
  username: string;
  password?: string;
  employee?: { fullName: string };
}

export interface AccessRequest {
  id: number;
  user: User;
  service: Service;
  role: Role;
  requestHistories?: RequestHistory[];
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

export interface RequestHistory {
  status: Status;
}

export interface Status {
  name: string;
}

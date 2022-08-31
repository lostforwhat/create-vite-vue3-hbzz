export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  userid?: string;
  username?: string;
  realname?: string;
  avatar?: string;
  desc?: string;
  password?: string;
  token?: string;
  organization?: string;
  location?: string;
  email?: string;
  auths?: string[];
  role?: RoleType;
  [key: string]: any;
}

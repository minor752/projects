import { TUser } from './user.type';

export interface IGetAllUsersGQL {
  getAllUsers: TUser[];
}

export interface IGetOneUserGQL {
  getOneUser: TUser;
}

export interface ICreateUser {
  createUser: TUser;
}

export interface IDeleteUser {
  removeUser: number;
}

export interface IUpdateUser {
  updateUser: TUser;
}

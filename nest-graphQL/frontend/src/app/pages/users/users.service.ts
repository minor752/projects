import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  ICreateUser,
  IDeleteUser,
  IGetAllUsersGQL,
  IGetOneUserGQL,
  IUpdateUser,
} from 'src/app/types/gql.types';
import { TUser } from 'src/app/types/user.type';
import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USERS,
  GET_ONE_USER,
  UPDATE_USER,
} from './users.gql';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private readonly apollo: Apollo) {}

  getAllUsers(): Observable<TUser[]> {
    return this.apollo
      .watchQuery<IGetAllUsersGQL>({
        query: GET_ALL_USERS,
      })
      .valueChanges.pipe(map(({ data }) => data?.getAllUsers));
  }

  getOneUser(id: number): Observable<{ user: TUser; loading: boolean }> {
    return this.apollo
      .watchQuery<IGetOneUserGQL>({
        query: GET_ONE_USER,
        variables: { id: +id },
      })
      .valueChanges.pipe(
        map(({ data, loading }) => ({
          user: data?.getOneUser,
          loading,
        }))
      );
  }

  createUser(name: string, email: string): Observable<TUser | undefined> {
    return this.apollo
      .mutate<ICreateUser>({
        mutation: CREATE_USER,
        variables: { createUser: { name, email } },
        refetchQueries: ['getAllUsers'],
      })
      .pipe(map(({ data }) => data?.createUser));
  }

  deleteUser(id: number): Observable<number | undefined> {
    return this.apollo
      .mutate<IDeleteUser>({
        mutation: DELETE_USER,
        variables: { id: +id },
        refetchQueries: ['getAllUsers'],
      })
      .pipe(map(({ data }) => data?.removeUser));
  }

  updateUser(
    id: number,
    name: string,
    email: string
  ): Observable<TUser | undefined> {
    return this.apollo
      .mutate<IUpdateUser>({
        mutation: UPDATE_USER,
        variables: { updateUser: { id, name, email }},
        refetchQueries: ['getOneUser'],
      })
      .pipe(map(({ data }) => data?.updateUser));
  }
}

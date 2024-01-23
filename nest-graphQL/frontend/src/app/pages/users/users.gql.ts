import { gql } from 'apollo-angular';

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
    }
  }
`;

export const GET_ONE_USER = gql`
  query getOneUser($id: Float!) {
    getOneUser(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Float!) {
    removeUser(id: $id) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($createUser: CreateUserInput!) {
    createUser(createUser: $createUser) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($updateUser: UpdateUserInput!) {
    updateUser(updateUser: $updateUser) {
      id
    }
  }
`;

export interface IEntity {
    id: string;
}

export interface User extends IEntity {
    name: string;
    email: string;
  }
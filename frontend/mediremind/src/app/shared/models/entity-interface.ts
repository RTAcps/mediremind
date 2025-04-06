export interface IEntity {
  id: string;
}

export interface User extends IEntity {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword?: string;
}

export interface Medication extends IEntity {
  name: string;
  dosage: string;
  timer: string;
  frequency: string;
  userId: string;
}

export interface Reminder extends IEntity {
  userId: string;
  medicationId: string;
  dateTime: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
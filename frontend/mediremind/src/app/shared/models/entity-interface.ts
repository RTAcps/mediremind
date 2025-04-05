export interface IEntity {
  id: string;
}

export interface User extends IEntity {
  name: string;
  email: string;
}

export interface Medication extends IEntity {
  name: string;
  dosage: string;
  frequency: string;
  userId: string;
}

export interface Reminder extends IEntity {
  userId: string;
  medicationId: string;
  dateTime: string;
}

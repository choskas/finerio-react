export type MovementsT = {
  account: Object;
  amount: NumberConstructor;
  balance: number;
  concepts: Array<any>;
  customDate: string;
  customDescription: string;
  date: string;
  dateCreated: string;
  deleted: boolean;
  description: string;
  duplicated: boolean;
  hasConcepts: boolean;
  id: string;
  inResume: boolean;
  lastUpdated: string;
};

export type User = {
   name: string;
   email: string;
   id: string;
  };
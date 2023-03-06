import { Account } from './Account';

export interface User {
  name: string;
  cpf: string;
  status: string;
  accounts: Account[];
}

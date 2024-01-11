import { BranchOffice, BranchOfficeCode, Count } from './inventory.interface';

export interface Shelter extends Count {
  warehouse: {
    name: BranchOffice
    code: BranchOfficeCode
  } 
}


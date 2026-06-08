export interface EmployeeRequest {

  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  salary: number;
  level: string;
  adress: string;
  birthDate: Date;
  departement: { id: number };
  team: { id: number };
  contract: { id: number };
}
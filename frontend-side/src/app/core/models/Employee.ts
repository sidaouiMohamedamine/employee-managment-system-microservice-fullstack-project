import { Contract } from "./Contract";
import { Department } from "./department";
import { Team } from "./Team";

export class Employee {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  salary: number;
  level: string;
  adress: string;
  department: Department;
  team: Team;
}

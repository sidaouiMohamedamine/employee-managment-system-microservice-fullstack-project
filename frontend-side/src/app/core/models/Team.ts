import { Employee } from "./Employee";

export interface Team {
  id: number;
  name: string;
  description: string;
  employees: Employee[];
}

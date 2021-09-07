import { Rover } from "../rovers/interfaces/rover.interface";

export interface Mission {
  commander: string;
  plateau: Plateau;
  rovers: Rover[];
}

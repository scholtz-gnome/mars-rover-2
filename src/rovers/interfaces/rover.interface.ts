import { Position } from "../../interfaces/position.interface";

export interface Rover {
  id: number;
  name: string;
  instructions: string[];
  commander: string;
  position: Position;
}

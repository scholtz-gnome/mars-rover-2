import { Position } from "./position.interface";

export interface Rover {
  id: number;
  name: string;
  instructions?: string;
  commander: string;
  position: Position;
}

import { Rover } from "./interfaces/rover.interface";

export class App {
  constructor(
    private readonly plateau: Plateau,
    private readonly rovers: Rover[]
  ) {}

  startMission(): void {
    console.log(this.plateau, this.rovers);
  }
}

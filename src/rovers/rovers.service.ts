import { Prompt } from "prompt-sync";
import { Terminal } from "terminal-kit";
import { InstructionsService } from "../instructions/instructions.service";
import { Position } from "../interfaces/position.interface";
import { PlateauService } from "../plateau/plateau.service";
import { Rover } from "./interfaces/rover.interface";

export class RoversService {
  constructor(
    private readonly plateauService: PlateauService,
    private readonly instructionsService: InstructionsService,
    private readonly prompt: Prompt,
    private readonly terminal: Terminal
  ) {}

  private receiveRoverCount = (commander: string): number => {
    const count = Number(
      this.prompt(
        `How many rovers are you deploying to Mars today, ${commander}? `
      ).trim()
    );

    return count;
  };

  private receiveStartingPosition = (roverName: string): Position => {
    const position = this.prompt(
      `Provide ${roverName}'s starting position (Eg, x: 4, y: 5, N): `
    ).trim();

    const coords = position.split(",");
    const direction = coords.pop()?.trim();
    const plateau = this.plateauService.formatPlateau(
      coords.map((coord) => coord.split(":"))
    );

    if (!direction) {
      throw new Error("Hey, give some direction!");
    }

    return {
      ...plateau,
      direction,
    };
  };

  countRovers(commander: string): number {
    let roverCount = this.receiveRoverCount(commander);

    while (roverCount < 1) {
      this.terminal
        .italic()
        .red(`You must send at least 1 Mars Rover, ${commander}\n`)
        .styleReset();

      roverCount = this.receiveRoverCount(commander);
    }

    return roverCount;
  }

  createRovers = (commander: string, roverCount: number): Rover[] => {
    const rovers: Rover[] = [];

    for (let i = 1; i <= roverCount; i++) {
      this.terminal.italic().green(`Default name: 'Rover ${i}'\n`).styleReset();

      const name = this.prompt(`Enter Rover ${i} name: `).trim();
      const roverName = name || `Rover ${i}`;
      let startingPosition = this.receiveStartingPosition(roverName);
      let instructions =
        this.instructionsService.receiveInstructions(roverName);

      instructions = this.instructionsService.checkInstructions(
        instructions,
        roverName
      );

      rovers.push({
        name: roverName,
        instructions,
        id: i,
        commander,
        position: startingPosition,
      });
    }

    return rovers;
  };
}

import { Prompt } from "prompt-sync";
import { Terminal } from "terminal-kit";
import { InstructionsService } from "../instructions/instructions.service";
import { Position } from "../interfaces/position.interface";
import { Rover } from "../interfaces/rover.interface";
import { PlateauService } from "../plateau/plateau.service";

export class RoversService {
  constructor() {
    this.plateauService = new PlateauService();
    this.instructionsService = new InstructionsService();
  }

  plateauService: PlateauService;
  instructionsService: InstructionsService;

  private receiveRoverCount = (commander: string, p: Prompt): number => {
    const count = Number(
      p(
        `How many rovers are you deploying to Mars today, ${commander}? `
      ).trim()
    );

    return count;
  };

  private receiveStartingPosition = (
    roverName: string,
    p: Prompt
  ): Position => {
    const position = p(
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

  countRovers(commander: string, p: Prompt, terminal: Terminal): number {
    let roverCount = this.receiveRoverCount(commander, p);

    while (roverCount < 1) {
      terminal
        .italic()
        .red(`You must send at least 1 Mars Rover, ${commander}\n`)
        .styleReset();

      roverCount = this.receiveRoverCount(commander, p);
    }

    return roverCount;
  }

  createRovers = (
    roverCount: number,
    commander: string,
    p: Prompt,
    terminal: Terminal
  ): Rover[] => {
    const rovers: Rover[] = [];

    for (let i = 1; i <= roverCount; i++) {
      terminal.italic().green(`Default name: 'Rover ${i}'\n`).styleReset();

      const name = p(`Enter Rover ${i} name: `).trim();
      const roverName = name || `Rover ${i}`;
      let startingPosition = this.receiveStartingPosition(roverName, p);
      let instructions = this.instructionsService.receiveInstructions(
        roverName,
        p
      );

      instructions = this.instructionsService.checkInstructions(
        instructions,
        roverName,
        p,
        terminal
      );

      rovers.push({
        name: roverName,
        instructions: instructions,
        id: i,
        commander,
        position: startingPosition,
      });
    }

    return rovers;
  };
}

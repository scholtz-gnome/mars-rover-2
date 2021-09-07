import { Prompt } from "prompt-sync";
import { Terminal } from "terminal-kit";

export class InstructionsService {
  constructor(
    private readonly prompt: Prompt,
    private readonly terminal: Terminal
  ) {}

  receiveInstructions = (roverName: string): string[] | undefined => {
    const instructions = this.prompt(`Enter ${roverName}'s instructions: `)
      .trim()
      .toUpperCase();

    const instructionsArray = instructions.split("");

    return instructionsArray;
  };

  checkInstructions = (
    instructions: string[] | undefined,
    roverName: string
  ): string[] => {
    let validInstructions = instructions;

    while (!validInstructions) {
      this.terminal
        .italic()
        .red(`Invalid input for ${roverName} instructions\n`)
        .styleReset();

      validInstructions = this.receiveInstructions(roverName);
    }

    return validInstructions;
  };
}

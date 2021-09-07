import { Prompt } from "prompt-sync";
import { Terminal } from "terminal-kit";

export class InstructionsService {
  receiveInstructions = (roverName: string, p: Prompt): string | undefined => {
    const instructions = p(`Enter ${roverName}'s instructions: `)
      .trim()
      .toUpperCase();

    return instructions;
  };

  checkInstructions = (
    instructions: string | undefined,
    roverName: string,
    p: Prompt,
    terminal: Terminal
  ): string => {
    let validInstructions = instructions;

    while (!validInstructions) {
      terminal
        .italic()
        .red(`Invalid input for ${roverName} instructions\n`)
        .styleReset();

      validInstructions = this.receiveInstructions(roverName, p);
    }

    return validInstructions;
  };
}

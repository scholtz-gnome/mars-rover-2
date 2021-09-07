import { Prompt } from "prompt-sync";

export class PlateauService {
  constructor(private readonly prompt: Prompt) {}

  formatPlateau(coords: string[][]): Plateau {
    const formattedPlateau = {
      x: Number(coords[0][1].trim()),
      y: Number(coords[1][1].trim()),
    };

    return formattedPlateau;
  }

  receivePlateau(): Plateau {
    const coords = this.prompt(
      "Enter the top right coordinates of the plateau (Eg. x: 5, y: 4): "
    ).trim();

    const splitCoords = coords.split(",").map((coord) => coord.split(":"));

    const plateau = this.formatPlateau(splitCoords);

    return plateau;
  }
}

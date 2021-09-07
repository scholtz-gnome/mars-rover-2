import { Prompt } from "prompt-sync";

export class PlateauService {
  formatPlateau(coords: string[][]): Plateau {
    const formattedPlateau = {
      x: Number(coords[0][1].trim()),
      y: Number(coords[1][1].trim()),
    };

    return formattedPlateau;
  }

  receivePlateau(p: Prompt): Plateau {
    const coords = p(
      "Enter the top right coordinates of the plateau (Eg. x: 5, y: 4): "
    ).trim();

    const splitCoords = coords.split(",").map((coord) => coord.split(":"));

    const plateau = this.formatPlateau(splitCoords);

    return plateau;
  }
}

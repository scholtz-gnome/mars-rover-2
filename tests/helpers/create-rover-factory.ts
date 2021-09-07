import { Rover } from "../../src/interfaces/rover.interface";

export const createRover = (initialRover: Partial<Rover>): Rover => {
  const rover: Rover = {
    id: 1,
    name: "Rover 1",
    instructions: "MMRMLM",
    commander: "Captain Spock",
    position: { x: 0, y: 0, direction: "N" },
    ...initialRover,
  };

  return rover;
};

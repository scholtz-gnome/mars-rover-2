import { App } from "../src/app";
import { createRover } from "./helpers/create-rover-factory";

describe("Mars Rover App", () => {
  let app: App;

  beforeAll(() => {
    const plateau = { x: 5, y: 5 };
    const rover1 = createRover({ id: 1 });
    const rover2 = createRover({ id: 2, name: "Rover 2" });

    app = new App(plateau, [rover1, rover2]);
  });

  describe("When a user plays the game", () => {
    it("return string", () => {
      expect(app.startMission()).toEqual("Let's play!");
    });
  });
});

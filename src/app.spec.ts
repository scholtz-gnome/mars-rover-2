import { createRover } from "../tests/helpers/create-rover-factory";
import { App } from "./app";

describe("App", () => {
  describe("#play", () => {
    it("returns string", () => {
      const plateau = { x: 5, y: 5 };
      const rover1 = createRover({});
      const rover2 = createRover({ name: "Rover 2" });

      const app = new App(plateau, [rover1, rover2]);
      expect(app.startMission()).toEqual("Let's play!");
    });
  });
});

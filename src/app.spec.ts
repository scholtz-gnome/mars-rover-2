import { App } from "./app";

describe("App", () => {
  describe("#play", () => {
    it("returns string", () => {
      const app = new App();
      expect(app.play()).toEqual("Let's play!");
    });
  });
});

import { App } from "./app";
import { Position } from "./interfaces/position.interface";
import { PlateauService } from "./plateau/plateau.service";
import { RoversService } from "./rovers/rovers.service";

describe("App", () => {
  let app: App;

  beforeEach(() => {
    app = new App({} as PlateauService, {} as RoversService, "Test Commander");
  });

  describe("#updateDirection", () => {
    describe("When it is facing North", () => {
      describe("and turns right", () => {
        it("returns new position, direction: East", () => {
          const currentPosition: Position = { x: 0, y: 0, direction: "N" };
          const newPosition = app.updateDirection("R", currentPosition);

          expect(newPosition).toEqual<Position>({
            ...currentPosition,
            direction: "E",
          });
        });
      });

      describe("and turns left", () => {
        it("returns new position, direction: West", () => {
          const currentPosition: Position = { x: 0, y: 0, direction: "N" };
          const newPosition = app.updateDirection("L", currentPosition);

          expect(newPosition).toEqual<Position>({
            ...currentPosition,
            direction: "W",
          });
        });
      });
    });

    describe("When it receives an invalid instruction", () => {
      it("returns the same position", () => {
        const currentPosition: Position = { x: 0, y: 0, direction: "N" };
        const newPosition = app.updateDirection("M", currentPosition);

        expect(newPosition).toEqual<Position>(currentPosition);
      });
    });
  });

  describe("#move", () => {
    describe("When the rover is facing North", () => {
      it("returns position with y: 1", () => {
        const currentPosition: Position = { x: 0, y: 0, direction: "N" };
        const newPosition = app.move(currentPosition);

        expect(newPosition).toEqual<Position>({
          ...currentPosition,
          y: 1,
        });
      });
    });

    describe("When the rover is facing East", () => {
      it("returns position with x: 1", () => {
        const currentPosition: Position = { x: 0, y: 0, direction: "E" };
        const newPosition = app.move(currentPosition);

        expect(newPosition).toEqual<Position>({
          ...currentPosition,
          x: 1,
        });
      });
    });

    describe("When the rover is facing South", () => {
      it("returns position with y: 0", () => {
        const currentPosition: Position = { x: 1, y: 1, direction: "S" };
        const newPosition = app.move(currentPosition);

        expect(newPosition).toEqual<Position>({
          ...currentPosition,
          y: 0,
        });
      });
    });

    describe("When the rover is facing West", () => {
      it("returns position with x: 0", () => {
        const currentPosition: Position = { x: 1, y: 1, direction: "W" };
        const newPosition = app.move(currentPosition);

        expect(newPosition).toEqual<Position>({
          ...currentPosition,
          x: 0,
        });
      });
    });
  });
});

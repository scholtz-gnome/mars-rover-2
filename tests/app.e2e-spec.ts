import { App } from "../src/app";
import { MissionStatus } from "../src/interfaces/mission-status.enum";
import { Mission } from "../src/interfaces/mission.interface";
import { PlateauService } from "../src/plateau/plateau.service";
import { Rover } from "../src/rovers/interfaces/rover.interface";
import { RoversService } from "../src/rovers/rovers.service";

describe("Mars Rover App", () => {
  let app: App;
  let successMission: Mission;
  let failMission: Mission;
  let wrongInstructionsMission: Mission;
  const commander = "Test Commander";

  const rover1: Rover = {
    commander,
    id: 1,
    name: "Rover 1",
    position: {
      x: 1,
      y: 2,
      direction: "N",
    },
    instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
  };
  const rover2: Rover = {
    commander,
    id: 2,
    name: "Rover 2",
    position: {
      x: 3,
      y: 3,
      direction: "E",
    },
    instructions: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
  };
  const rover3: Rover = {
    commander,
    id: 3,
    name: "Rover 3",
    position: {
      x: 0,
      y: 0,
      direction: "N",
    },
    instructions: ["M", "M", "M", "M", "M"],
  };
  const rover4: Rover = {
    commander,
    id: 4,
    name: "Rover 4",
    position: {
      x: 0,
      y: 0,
      direction: "N",
    },
    instructions: ["M", "G", "8", "M"],
  };

  beforeEach(() => {
    app = new App({} as PlateauService, {} as RoversService, commander);
    successMission = {
      commander,
      plateau: {
        x: 5,
        y: 5,
      },
      rovers: [rover1, rover2],
    };

    failMission = {
      commander,
      plateau: {
        x: 3,
        y: 3,
      },
      rovers: [rover3],
    };

    wrongInstructionsMission = {
      commander,
      plateau: {
        x: 3,
        y: 3,
      },
      rovers: [rover4],
    };
  });

  describe("When two rovers are given with the correct instructions", () => {
    it("returns a mission report with the rover's correct position", () => {
      const report = app.startMission(successMission);

      expect(report.success).toEqual(true);
      expect(report.status).toEqual(MissionStatus.COMPLETED);
      expect(report.rovers).toEqual<Rover[]>([
        { ...rover1, position: { x: 1, y: 3, direction: "N" } },
        { ...rover2, position: { x: 5, y: 1, direction: "E" } },
      ]);
    });
  });

  describe("When one rover is instructed to go beyond the bounds of the plateau", () => {
    it("returns a mission success of false and the rover doesn't move any further", () => {
      const report = app.startMission(failMission);

      expect(report.success).toEqual(false);
      expect(report.status).toEqual(MissionStatus.COMPLETED);
      expect(report.rovers).toEqual<Rover[]>([
        { ...rover3, position: { x: 0, y: 3, direction: "N" } },
      ]);
    });
  });

  describe("When one rover is given any invalid instructions", () => {
    it("doesn't change the Rover's position for that instruction but the mission doesn't fail", () => {
      const report = app.startMission(wrongInstructionsMission);

      expect(report.success).toEqual(true);
      expect(report.status).toEqual(MissionStatus.COMPLETED);
      expect(report.rovers).toEqual([
        {
          ...rover4,
          position: { x: 0, y: 2, direction: "N" },
        },
      ]);
    });
  });
});

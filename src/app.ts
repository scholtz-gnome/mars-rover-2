import { CARDINAL_POINTS } from "./interfaces/cardinal-points";
import { MissionReport } from "./interfaces/mission-report.interface";
import { MissionStatus } from "./interfaces/mission-status.enum";
import { Mission } from "./interfaces/mission.interface";
import { Position } from "./interfaces/position.interface";
import { PlateauService } from "./plateau/plateau.service";
import { RoversService } from "./rovers/rovers.service";

export class App {
  constructor(
    private readonly plateauService: PlateauService,
    private readonly roversService: RoversService,
    private readonly commander: string
  ) {}

  generateMission(): Mission {
    const plateau = this.plateauService.receivePlateau();
    const roverCount = this.roversService.countRovers(this.commander);
    const rovers = this.roversService.createRovers(this.commander, roverCount);

    return {
      commander: this.commander,
      plateau,
      rovers,
    };
  }

  private turnRight(direction: string): string {
    const cardinalIndex = CARDINAL_POINTS.indexOf(direction);
    const increasedIndex = (4 + cardinalIndex + 1) % 4;

    return CARDINAL_POINTS[increasedIndex];
  }

  private turnLeft(direction: string): string {
    const cardinalIndex = CARDINAL_POINTS.indexOf(direction);
    const decreasedIndex = (4 + cardinalIndex - 1) % 4;

    return CARDINAL_POINTS[decreasedIndex];
  }

  updateDirection(turn: string, currentPosition: Position): Position {
    if (turn === "R") {
      const newDirection = this.turnRight(currentPosition.direction);
      return { ...currentPosition, direction: newDirection };
    } else if (turn === "L") {
      const newDirection = this.turnLeft(currentPosition.direction);
      return { ...currentPosition, direction: newDirection };
    } else {
      console.log(`${turn} is an invalid instruction`);

      return currentPosition;
    }
  }

  move(currentPosition: Position): Position {
    switch (currentPosition.direction) {
      case "N":
        return { ...currentPosition, y: currentPosition.y + 1 };
      case "E":
        return { ...currentPosition, x: currentPosition.x + 1 };
      case "S":
        return { ...currentPosition, y: currentPosition.y - 1 };
      case "W":
        return { ...currentPosition, x: currentPosition.x - 1 };
    }

    return currentPosition;
  }

  checkMoveAgainstPlateau(newPosition: Position, plateau: Plateau): boolean {
    if (newPosition.x > plateau.x || newPosition.y > plateau.y) {
      return true;
    }

    return false;
  }

  startMission(mission: Mission): Partial<MissionReport> {
    let initialReport: Partial<MissionReport> = {
      status: MissionStatus.IN_PROGRESS,
      success: true,
      rovers: [],
    };

    console.log(`Mission status: ${initialReport.status}`);

    for (const rover of mission.rovers) {
      let currentPosition = rover.position;
      for (const instruction of rover.instructions) {
        if (
          currentPosition.x >= mission.plateau.x ||
          currentPosition.y >= mission.plateau.y
        ) {
          currentPosition = currentPosition;
        }

        if (instruction !== "M") {
          currentPosition = this.updateDirection(instruction, currentPosition);
        } else if (instruction === "M") {
          const newPosition = this.move(currentPosition);

          const outOfBounds = this.checkMoveAgainstPlateau(
            newPosition,
            mission.plateau
          );

          if (outOfBounds) {
            console.log(
              `${rover.name} cannot move to x:${newPosition.x}, y:${newPosition.y}`
            );
            initialReport.success = false;
            break;
          } else {
            currentPosition = newPosition;
          }
        }
      }

      initialReport.rovers?.push({ ...rover, position: currentPosition });
      console.log(
        `${rover.name} completed. New position: x:${currentPosition.x}, y:${currentPosition.y}, direction: ${currentPosition.direction}`
      );
    }

    initialReport.status = MissionStatus.COMPLETED;

    return {
      status: initialReport.status,
      success: initialReport.success,
      rovers: initialReport.rovers,
    };
  }
}

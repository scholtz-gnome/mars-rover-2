import { Rover } from "../rovers/interfaces/rover.interface";
import { MissionStatus } from "./mission-status.enum";

export interface MissionReport {
  success: boolean;
  status: MissionStatus;
  rovers: Rover[];
}

import prompt from "prompt-sync";
import { terminal } from "terminal-kit";
import { App } from "./app";
import { InstructionsService } from "./instructions/instructions.service";
import { PlateauService } from "./plateau/plateau.service";
import { RoversService } from "./rovers/rovers.service";

const p = prompt();
const plateauService = new PlateauService(p);
const instructionsService = new InstructionsService(p, terminal);
const roversService = new RoversService(
  plateauService,
  instructionsService,
  p,
  terminal
);
const commander = p("Please enter your name: ");
const app = new App(plateauService, roversService, commander);

const mission = app.generateMission();
console.log("Mission Summary", mission, "\n----------------\n");

const report = app.startMission(mission);
console.log("Mission Status", report.status, "\n----------------\n");
console.log("Mission Success", report.success, "\n----------------\n");
console.log(report.rovers, "\n----------------\n");

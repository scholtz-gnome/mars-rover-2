import prompt from "prompt-sync";
import { terminal } from "terminal-kit";
import { App } from "./app";
import { PlateauService } from "./plateau/plateau.service";
import { RoversService } from "./rovers/rovers.service";

const p = prompt();
const roversService = new RoversService();
const plateauService = new PlateauService();

const commander = p("Please enter your name: ");
const plateau = plateauService.receivePlateau(p);
const roverCount = roversService.countRovers(commander, p, terminal);
const rovers = roversService.createRovers(roverCount, commander, p, terminal);

new App(plateau, rovers);

console.log(rovers);

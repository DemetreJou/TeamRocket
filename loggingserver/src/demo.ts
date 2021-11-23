import { Level, LogManager } from "./log_manager";

const manager = new LogManager();

manager.log("first message", Level.LOG);
manager.log("second message", Level.WARN);
manager.log("third message", Level.ERROR);
// manager.log("fourth message", 5); this will error out 
const result = manager.searchAll();
console.log(result);


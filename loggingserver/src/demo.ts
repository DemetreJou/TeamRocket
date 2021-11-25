// Use this file to test out the connection to the docker db
// run the following commands:
// npx prisma migrate dev --name init
// npm run build 
// npm start
// that should run this file
import { Level, LogManager } from "./log_manager";

const manager = new LogManager();

manager.log("first message", Level.LOG);
manager.log("second message", Level.WARN);
manager.log("third message", Level.ERROR);
// manager.log("fourth message", 5); this will error out 
const result = manager.searchAll();
console.log(result);


import { v4 as uuidv4 } from 'uuid';
import { DatabaseManager } from './db';

export enum Level {
    LOG = 1,
    WARN,
    ERROR
}

export class LogManager {

    machineID: string; // the ID of the machine
    dbManager: DatabaseManager; // The db manager 
    isClosed: boolean;

    constructor() {
        this.machineID = uuidv4();
        this.dbManager = new DatabaseManager();
        this.isClosed = false;
    }

    async log(message: string, level: Level, logToConsole: boolean = true) {
        if (this.isClosed) {
            throw new Error("Invalid process. Please create new LogManager...");
        } 
        if (level > Level.ERROR || level < Level.LOG) {
            throw new Error("Invalid level. Please consult level enum...");
        }
        const logMsg = {
            message: message,
            timeAdded: null,
            timeCreated: new Date().getTime(),
            level: level,
            machineID: this.machineID
        };
        await this.dbManager.addLog(logMsg)
        .then((result) => {
            if (logToConsole) {
                console.log(result);
            }
        })
        .catch((error) => {
            console.error("Log message not added to the database: ", logMsg);
            console.error(error);
        })
    }

    async searchAll(printAll: boolean = false): Promise<any>{
        await this.dbManager.searchLogs()
        .then((result) => {
            if (printAll) {
                for (let entry of result){
                    console.log(entry);
                }
            }
            return result;
        })
        .catch((error) => {
            console.error("No logs found...");
            console.error(error);
        })
    }

    async close() {
        this.isClosed = true;
        this.dbManager.disconnect();
    }
}
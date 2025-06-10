import { CommandHandler, UserCommandHandler } from "../commands";
import { readConfig } from "../config";
import { getByName } from "../lib/db/queries/users";

export const userLoggedIn = (handler: UserCommandHandler): CommandHandler => {
    return async (command: string, ...args: string[]): Promise<void> => {
        const username = readConfig().currentUserName

        const user = await getByName(username)
    
        if (!user) {
            throw new Error(`User ${username} not found`);
        }

        await handler(command, user, ...args)
    }
}
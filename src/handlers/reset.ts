import { CommandHandler } from "../commands"
import { truncate } from "../lib/db/queries/users"

export const reset: CommandHandler = async (command: string, ...args: string[]) => {
    await truncate()

    console.log(`Successfully reset`)
}
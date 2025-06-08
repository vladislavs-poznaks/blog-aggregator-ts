import { CommandHandler } from "../commands"
import { setUser } from "../config"
import { create } from "../lib/db/queries/users"

export const register: CommandHandler = async (command: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error('Username is required for registration')
    }

    const user = await create(args[0])

    setUser(user.name)

    console.log(`Registered as ${user.name} with id ${user.id}`)
}
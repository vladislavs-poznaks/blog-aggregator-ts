import { CommandHandler } from "../commands"
import { setUser } from "../config"
import { getByName } from "../lib/db/queries/users"

export const login: CommandHandler = async (command: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error('Username is required for login')
    }

    const user = await getByName(args[0])

    if (!user) {
        throw new Error('User not found')
    }

    setUser(user.name)

    console.log(`Logged in as ${user.name}`)
}
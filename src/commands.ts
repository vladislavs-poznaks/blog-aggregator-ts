import { User } from "./lib/db/schema"

export type CommandHandler = (command: string, ...args: string[]) => Promise<void>

export type UserCommandHandler = (command: string, user: User, ...args: string[]) => Promise<void>

export type CommandRegistry = Record<string, CommandHandler>

export const registerCommand = (registry: CommandRegistry, command: string, handler: CommandHandler) => {
    registry[command] = handler
}

export const runCommand = async (registry: CommandRegistry, command: string, ...args: string[]) => {
    const handler = registry[command]

    if (!handler) {
        throw new Error(`Command ${command} not found`)
    }

    await handler(command, ...args)
}
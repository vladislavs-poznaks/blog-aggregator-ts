export type CommandHandler = (command: string, ...args: string[]) => void

export type CommandRegistry = Record<string, CommandHandler>

export const register = (registry: CommandRegistry, command: string, handler: CommandHandler) => {
    registry[command] = handler
}

export const run = (registry: CommandRegistry, command: string, ...args: string[]) => {
    const handler = registry[command]

    if (!handler) {
        throw new Error(`Command ${command} not found`)
    }

    handler(command, ...args)
}
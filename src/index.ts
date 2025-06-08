import process from 'process'

import { CommandRegistry, registerCommand, runCommand } from "./commands"
import { login } from "./handlers/login"
import { register } from "./handlers/register"

async function main() {
    const registry: CommandRegistry = {}

    registerCommand(registry, 'login', login)
    registerCommand(registry, 'register', register)

    const args = process.argv.slice(2)

    if (args.length === 0) {
        throw new Error('Command is required')
        process.exit(1)
    }

    try {
        await runCommand(registry, args[0], ...args.slice(1))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

    process.exit(0)
}

main()

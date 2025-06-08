import process from 'process'

import { setUser } from "./config"
import { CommandRegistry, CommandHandler, register, run } from "./commands"

function main() {
    const registry: CommandRegistry = {}

    register(registry, 'login', (command, ...args) => {
        if (args.length === 0) {
            throw new Error('Username is required')
        }

        setUser(args[0])

        console.log(`Logged in as ${args[0]}`)
    })

    const args = process.argv.slice(2)

    if (args.length === 0) {
        throw new Error('Command is required')
        process.exit(1)
    }

    try {
        run(registry, args[0], ...args.slice(1))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()

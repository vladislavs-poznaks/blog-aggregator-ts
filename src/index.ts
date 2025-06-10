import process from 'process'

import { CommandRegistry, registerCommand, runCommand } from "./commands"
import { login } from "./handlers/login"
import { register } from "./handlers/register"
import { reset } from "./handlers/reset"
import { agg } from "./handlers/agg"
import { addfeed } from './handlers/addfeed'
import { getFeeds } from './handlers/feeds'
import { follow } from './handlers/follow'
import { following } from './handlers/following'


async function main() {
    const registry: CommandRegistry = {}

    registerCommand(registry, 'login', login)
    registerCommand(registry, 'register', register)
    registerCommand(registry, 'reset', reset)
    registerCommand(registry, 'agg', agg)
    registerCommand(registry, 'addfeed', addfeed)
    registerCommand(registry, 'feeds', getFeeds)
    registerCommand(registry, 'follow', follow)
    registerCommand(registry, 'following', following)

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

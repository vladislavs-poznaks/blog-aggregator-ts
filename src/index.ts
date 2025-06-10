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
import { userLoggedIn } from './middleware/user_logged_in'
import { unfollow } from './handlers/unfollow'


async function main() {
    const registry: CommandRegistry = {}

    registerCommand(registry, 'login', login)
    registerCommand(registry, 'register', register)
    registerCommand(registry, 'reset', reset)
    registerCommand(registry, 'agg', agg)
    registerCommand(registry, 'addfeed', userLoggedIn(addfeed))
    registerCommand(registry, 'feeds', getFeeds)
    registerCommand(registry, 'follow', userLoggedIn(follow))
    registerCommand(registry, 'unfollow', userLoggedIn(unfollow))
    registerCommand(registry, 'following', userLoggedIn(following))

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

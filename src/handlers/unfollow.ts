import { UserCommandHandler } from "../commands"
import { deleteFeedFollow } from "../lib/db/queries/feed_follows"
import { User } from "../lib/db/schema"

export const unfollow: UserCommandHandler = async (command: string, user: User, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error('Usage: cmd <url>')
    }

    await deleteFeedFollow(user, args[0])

    console.log(`User ${user.name} unfollowed (${args[0]})`)
}

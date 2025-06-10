import { UserCommandHandler } from "../commands"
import { create } from "../lib/db/queries/feed_follows"
import { getByUrl } from "../lib/db/queries/feeds"
import { User } from "../lib/db/schema"

export const follow: UserCommandHandler = async (command: string, user: User, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error('Usage: cmd <url>')
    }

    const feed = await getByUrl(args[0])

    await create(user.id, feed.id)

    console.log(`User ${user.name} followed ${feed.name} (${feed.url})`)
}

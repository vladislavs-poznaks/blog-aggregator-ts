import { UserCommandHandler } from "../commands"
import { create as createFeedFollow } from "../lib/db/queries/feed_follows"
import { create as createFeed } from "../lib/db/queries/feeds"
import { Feed, User } from "../lib/db/schema"


export const addfeed: UserCommandHandler = async (command: string, user: User, ...args: string[]) => {
    if (args.length < 2) {
        throw new Error('Usage: cmd <name> <url>')
    }

    const feed = await createFeed(args[0], args[1], user.id)

    await createFeedFollow(user.id, feed.id)

    printFeed(user, feed)
}

const printFeed = (user: User, feed: Feed) => {
    console.log(user)
    console.log(feed)
}

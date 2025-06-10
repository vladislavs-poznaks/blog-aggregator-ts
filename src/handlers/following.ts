import { UserCommandHandler } from "../commands"
import { getFeedFolowsForUser } from "../lib/db/queries/feed_follows"
import { User } from "../lib/db/schema"


export const following: UserCommandHandler = async (command: string, user: User, ...args: string[]) => {
    const feeds = await getFeedFolowsForUser(user)

    for (const feed of feeds) {
        console.log('--- Following feeds ---')
        console.log(`Feed name: ${feed.feeds.name}`)
        console.log(`Feed url: ${feed.feeds.url}`)
    }
}

import { CommandHandler } from "../commands"
import { readConfig } from "../config"
import { getFeedFolowsForUser } from "../lib/db/queries/feed_follows"


export const following: CommandHandler = async (command: string, ...args: string[]) => {
    const feeds = await getFeedFolowsForUser(readConfig().currentUserName)

    for (const feed of feeds) {
        console.log('--- Following feeds ---')
        console.log(`Feed name: ${feed.feeds.name}`)
        console.log(`Feed url: ${feed.feeds.url}`)
    }
}

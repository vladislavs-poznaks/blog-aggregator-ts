import { CommandHandler } from "../commands"
import { getFeedsWithUsers } from "../lib/db/queries/feeds";
import {feeds} from "../lib/db/schema"

export type Feed = typeof feeds.$inferSelect;


export const getFeeds: CommandHandler = async (command: string, ...args: string[]) => {
    const feedsWithUsers = await getFeedsWithUsers()

    for (const feedWithUser of feedsWithUsers) {
        console.log('--- Feed info ---')
        console.log(`Feed name: ${feedWithUser.feeds.name}`)
        console.log(`Feed url: ${feedWithUser.feeds.url}`)
        console.log(`Feed author: ${feedWithUser.users?.name}`)
    }
}

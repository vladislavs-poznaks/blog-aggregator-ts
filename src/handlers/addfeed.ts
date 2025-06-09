import { CommandHandler } from "../commands"
import { readConfig } from "../config"
import { create } from "../lib/db/queries/feeds"
import { getByName } from "../lib/db/queries/users"
import { feeds, users } from "../lib/db/schema"

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;


export const addfeed: CommandHandler = async (command: string, ...args: string[]) => {
    if (args.length < 2) {
        throw new Error('Usage: cmd <name> <url>')
    }

    const user = await getByName(readConfig().currentUserName)

    const feed = await create(args[0], args[1], user.id)

    printFeed(user, feed)
}

const printFeed = (user: User, feed: Feed) => {
    console.log(user)
    console.log(feed)
}

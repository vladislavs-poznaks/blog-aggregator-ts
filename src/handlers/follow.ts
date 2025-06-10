import { CommandHandler } from "../commands"
import { readConfig } from "../config"
import { create } from "../lib/db/queries/feed_follows"
import { getByUrl } from "../lib/db/queries/feeds"
import { getByName } from "../lib/db/queries/users"
import { feeds, users } from "../lib/db/schema"

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;


export const follow: CommandHandler = async (command: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error('Usage: cmd <url>')
    }

    const user = await getByName(readConfig().currentUserName)

    const feed = await getByUrl(args[0])

    const result = await create(user.id, feed.id)

    console.log(`User ${user.name} followed ${feed.name} (${feed.url})`)
}

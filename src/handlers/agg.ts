import { CommandHandler } from "../commands"
import { fetchFeed, RSSFeed } from "../feed"

export const agg: CommandHandler = async (command: string, ...args: string[]) => {
    const url = 'https://www.wagslane.dev/index.xml'

    const feed: RSSFeed = await fetchFeed(url)

    console.log(feed)

    for (const it of feed.channel.item) {
        console.log(it)
    }
}

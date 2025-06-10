import { fetchFeed } from "./feed"
import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feeds"


export const scrape = async () => {
    const nextFeed = await getNextFeedToFetch()

    await markFeedFetched(nextFeed.id)

    const feed = await fetchFeed(nextFeed.url)

    console.log(`### Fetched feed: ${feed.channel.title} ###`)

    for (const item of feed.channel.item) {
        console.log(`- ${item.title}`)
    }

}
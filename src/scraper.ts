import { fetchFeed } from "./feed"
import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feeds"
import { create } from "./lib/db/queries/posts"


export const scrape = async () => {
    const nextFeed = await getNextFeedToFetch()

    await markFeedFetched(nextFeed.id)

    const feed = await fetchFeed(nextFeed.url)

    console.log(`### Fetched feed: ${feed.channel.title} ###`)

    for (const item of feed.channel.item) {

        try {
            const post = await create(item.title, item.link, item.description, item.pubDate, nextFeed.id)

            console.log(`- ${post.title}`)
        } catch (err) {
            //
        }
    }

}
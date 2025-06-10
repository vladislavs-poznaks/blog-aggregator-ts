import { and, eq } from "drizzle-orm"
import { db } from ".."
import { feedFollows, feeds, User, users } from "../schema"

export const create = async (userId: string, feedId: string) => {
    const [inserted] = await db.insert(feedFollows).values({ userId: userId, feedId: feedId}).returning()

    const [result] = await db.select().from(feedFollows)
        .where(eq(feedFollows.id, inserted.id))
        .leftJoin(users, eq(users.id, feedFollows.userId))
        .leftJoin(feeds, eq(feeds.id, feedFollows.feedId))
  
    return result
}

export const getFeedFolowsForUser = async (user: User) => {
    const result = await db.select().from(feeds)
        .where(eq(users.id, user.id))
        .leftJoin(feedFollows, eq(feeds.id, feedFollows.feedId))
        .leftJoin(users, eq(users.id, feedFollows.userId))

    return result
}

export const deleteFeedFollow = async (user: User, url: string) => {
    const [result] = await db.select().from(feedFollows)
        .where(
            and(
                eq(feedFollows.userId, user.id),
                eq(feeds.url, url)
            )
        )
        .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))

    await db.delete(feedFollows).where(eq(feedFollows.id, result.feed_follows.id))
}

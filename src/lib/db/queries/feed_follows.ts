import { eq } from "drizzle-orm"
import { db } from ".."
import { feedFollows, feeds, users } from "../schema"

export const create = async (userId: string, feedId: string) => {
    const [inserted] = await db.insert(feedFollows).values({ userId: userId, feedId: feedId}).returning()

    const [result] = await db.select().from(feedFollows)
        .where(eq(feedFollows.id, inserted.id))
        .leftJoin(users, eq(users.id, feedFollows.userId))
        .leftJoin(feeds, eq(feeds.id, feedFollows.feedId))
  
    return result
}

export const getFeedFolowsForUser = async (name: string) => {
    const result = await db.select().from(feeds)
        .where(eq(users.name, name))
        .leftJoin(feedFollows, eq(feeds.id, feedFollows.feedId))
        .leftJoin(users, eq(users.id, feedFollows.userId))

    return result
}

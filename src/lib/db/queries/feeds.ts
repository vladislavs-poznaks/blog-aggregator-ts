import { eq, sql } from "drizzle-orm"
import { db } from ".."
import { feeds, users } from "../schema"

export const create = async (name: string, url: string, userId: string) => {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId }).returning()
  
    return result
}

export const getByUrl = async (url: string) => {
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url))
  
    return result
  }

export const getFeedsWithUsers = async () => {
    const result = await db.select().from(feeds).leftJoin(users, eq(users.id, feeds.userId))

    return result
}

export const markFeedFetched = async (feedId: string) => {
    const now = new Date

    const [result] = await db.update(feeds).set({lastFetchedAt: now, updatedAt: now}).where(eq(feeds.id, feedId)).returning()

    return result
}

export const getNextFeedToFetch = async () => {
    const [result] = await db.select().from(feeds).orderBy(sql`${feeds.lastFetchedAt} asc nulls first`).limit(1)

    return result
}

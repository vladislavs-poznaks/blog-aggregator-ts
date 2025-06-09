import { eq } from "drizzle-orm"
import { db } from ".."
import { feeds, users } from "../schema"

export const create = async (name: string, url: string, userId: string) => {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId }).returning()
  
    return result
}

export const getFeedsWithUsers = async () => {
    const result = await db.select().from(feeds).leftJoin(users, eq(users.id, feeds.userId))

    return result
}

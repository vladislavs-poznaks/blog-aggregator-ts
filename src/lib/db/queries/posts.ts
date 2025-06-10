import { desc, eq, sql } from "drizzle-orm"
import { db } from ".."
import { feedFollows, posts, users, User } from "../schema"

export const create = async (title: string, url: string, description: string, publishedAt: string, feedId: string) => {
    const [result] = await db.insert(posts)
        .values({ title: title, url: url, description: description, publishedAt: new Date(publishedAt), feedId: feedId })
        .returning()
  
    return result
}

export const getPostsForUser = async (user: User, numOfPosts: number = 10) => {
    const result = await db.select().from(posts)
        .where(eq(users.id, user.id))
        .leftJoin(feedFollows, eq(feedFollows.feedId, posts.feedId))
        .leftJoin(users, eq(users.id, feedFollows.userId))
        .orderBy(desc(posts.publishedAt))
        .limit(numOfPosts)

    return result
}

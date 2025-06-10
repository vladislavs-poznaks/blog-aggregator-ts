import { UserCommandHandler } from "../commands"
import { getPostsForUser } from "../lib/db/queries/posts";
import { User } from "../lib/db/schema";

export const browse: UserCommandHandler = async (command: string, user: User, ...args: string[]) => {
    const limit = args.length > 0 ? parseInt(args[0]) : 2

    const posts = await getPostsForUser(user, limit)

    for (const post of posts) {
        console.log(`--- ${post.posts.title} | ${post.posts.publishedAt} ---`)
        console.log(post.posts.description)

        console.log(`Link: ${post.posts.url}`)
    }
}

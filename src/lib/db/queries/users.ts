import { db } from ".."
import { users } from "../schema"
import { eq } from "drizzle-orm"

export const create = async (name: string) => {
  const [result] = await db.insert(users).values({ name: name }).returning()

  return result
}

export const getByName = async (name: string) => {
  const [result] = await db.select().from(users).where(eq(users.name, name))

  return result
}

export const truncate = async () => {
  await db.delete(users)
}

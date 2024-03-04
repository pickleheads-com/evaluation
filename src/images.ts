import { db } from "./db"

const getImage = async (catname: string): Promise<string | undefined> => {
  const result = await db.first().from("images").where("id", "=", catname)
  return result?.url
}

export { getImage }

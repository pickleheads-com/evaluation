import type { Knex } from "knex"

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: "postgresql://localhost",
  },
}

export default config

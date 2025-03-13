import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.string("id").unique()
    table.string("email")
    table.string("active")
  })
  await knex.schema.createTable("permissions", (table) => {
    table.string("user_id").references("users.id")
    table.string("image_id").references("images.id")  
    table.string("allowed")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users")
  await knex.schema.dropTable("permissions")
}

import Knex from "knex"
import KnexPostgis from "knex-postgis"
import knexfile from "../knexfile"

export const db = Knex(knexfile.development)
export const st = KnexPostgis(db)

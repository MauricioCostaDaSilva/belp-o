import knex from 'knex'
import process from 'node:process'

export default knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '35.224.165.199',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'mauriciocosta',
    password: process.env.DB_PASSWORD || 'ylc,L%}9?6En~e#L',
    database: process.env.DB_NAME || 'belpao'
  }
})

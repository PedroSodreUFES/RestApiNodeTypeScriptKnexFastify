import type { Knex } from 'knex'

// o que a migration vai fazer
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary() // universal unique id
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

// deu ruim, como voltar atrás ? em geral faz o contrário do campo up
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

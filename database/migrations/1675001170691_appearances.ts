import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'appearances'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').nullable()
      table.string('picture').notNullable()
      table.boolean('is_default').notNullable()
      table.boolean('is_shiny').notNullable()
      table
        .integer('pokemon_national_number')
        .unsigned()
        .references('pokemon.national_number')
        .notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pokemon'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('national_number').unsigned().primary()
      table.string('name').unique().notNullable()
      table
        .integer('evolution_of_national_number')
        .unsigned()
        .nullable()
        .references('pokemon.national_number')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

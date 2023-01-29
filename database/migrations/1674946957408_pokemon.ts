import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pokemon'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('national_number').primary()
      table.string('name')
      table.integer('evolution_of').unsigned().references('')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

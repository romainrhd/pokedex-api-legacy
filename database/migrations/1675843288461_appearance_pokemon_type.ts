import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'appearance_pokemon_type'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('appearance_id').unsigned().references('appearances.id').onDelete('CASCADE')
      table.integer('pokemon_type_id').unsigned().references('pokemon_types.id').onDelete('CASCADE')
      table.primary(['appearance_id', 'pokemon_type_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

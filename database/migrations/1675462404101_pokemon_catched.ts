import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pokemon_catched'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('users.id')
      table.integer('appearance_id').unsigned().references('appearances.id')
      table.primary(['user_id', 'appearance_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

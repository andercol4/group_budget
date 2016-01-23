class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.date :due_date
      t.boolean :is_paid, default: false
      t.boolean :recurring, default: false
      t.string :name
      t.belongs_to :group, index: true, foreign_key: true
      t.float :amount_total
      t.float :amount_paid, default: 0

      t.timestamps null: false
    end
  end
end

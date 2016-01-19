class CreateUserBills < ActiveRecord::Migration
  def change
    create_table :user_bills do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :bill, index: true, foreign_key: true
      t.float :amount_owed
      t.float :amount_paid
      t.boolean :is_paid

      t.timestamps null: false
    end
  end
end

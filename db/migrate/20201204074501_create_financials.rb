class CreateFinancials < ActiveRecord::Migration[6.0]
  def change
    create_table :financials do |t|
      t.string :account_id

      t.boolean :is_overdue, default: "false"
      
      t.decimal :last_payment_amount
      t.datetime :last_payment_date

      t.decimal :last_statement_balance
      t.datetime :last_statement_issue_date
      t.decimal :minimum_payment_amount
      t.datetime :next_payment_due_date

      t.timestamps
    end

    add_index :financials, :account_id, unique: false
    add_reference :financials, :user, foreign_key: true
  end
end

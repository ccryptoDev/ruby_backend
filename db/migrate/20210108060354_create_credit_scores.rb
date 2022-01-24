class CreateCreditScores < ActiveRecord::Migration[6.0]
  def change
    create_table :credit_scores do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :score

      t.timestamps
    end

    add_index :plaid_auths, :created_at
  end
end

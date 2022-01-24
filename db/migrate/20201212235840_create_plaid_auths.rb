class CreatePlaidAuths < ActiveRecord::Migration[6.0]
  def change
    create_table :plaid_auths do |t|
      t.string :link_token
      t.string :public_token
      t.string :access_token
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :plaid_auths, :link_token
    add_index :plaid_auths, :public_token
    add_index :plaid_auths, :access_token
  end
end

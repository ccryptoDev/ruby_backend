class AddDefaultAccountToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :default_account_id, :string
  end
end

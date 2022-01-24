class AddItemIdToPlaidAuth < ActiveRecord::Migration[6.0]
  def change
    add_column :plaid_auths, :item_id, :string
  end
end

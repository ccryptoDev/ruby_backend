class AddNameToFinancials < ActiveRecord::Migration[6.0]
  def change
    add_column :financials, :account_name, :string
  end
end

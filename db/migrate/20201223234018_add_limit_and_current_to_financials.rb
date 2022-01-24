class AddLimitAndCurrentToFinancials < ActiveRecord::Migration[6.0]
  def change
    add_column :financials, :limit, :decimal
    add_column :financials, :current_balance, :decimal
  end
end

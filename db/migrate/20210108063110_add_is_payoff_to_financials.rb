class AddIsPayoffToFinancials < ActiveRecord::Migration[6.0]
  def change
    add_column :financials, :is_payoff, :bool
  end
end

class AddMaskToFinancials < ActiveRecord::Migration[6.0]
  def change
    add_column :financials, :mask, :string
  end
end

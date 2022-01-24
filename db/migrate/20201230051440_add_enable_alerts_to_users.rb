class AddEnableAlertsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :enable_alerts, :boolean
  end
end

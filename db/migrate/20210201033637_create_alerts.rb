class CreateAlerts < ActiveRecord::Migration[6.0]
  def change
    create_table :alerts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :message_type
      t.string :phone_number
      t.string :sid

      t.timestamps
    end
  end
end

class CreateNstitches < ActiveRecord::Migration[6.0]
  def change
    create_table :nstitches do |t|
      t.references :user, null: false, foreign_key: true
      t.string :nstitch_user_id

      t.string :email,              null: false, default: ""
      t.string :fname
      t.string :lname
      t.string :mobile,              null: false, default: ""

      t.timestamps
    end
  end
end

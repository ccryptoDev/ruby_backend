# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_01_015927) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "message_type"
    t.string "phone_number"
    t.string "sid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_alerts_on_user_id"
  end

  create_table "credit_scores", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_credit_scores_on_user_id"
  end

  create_table "financials", force: :cascade do |t|
    t.string "account_id"
    t.boolean "is_overdue", default: false
    t.decimal "last_payment_amount"
    t.datetime "last_payment_date"
    t.decimal "last_statement_balance"
    t.datetime "last_statement_issue_date"
    t.decimal "minimum_payment_amount"
    t.datetime "next_payment_due_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.decimal "limit"
    t.decimal "current_balance"
    t.string "account_name"
    t.string "mask"
    t.boolean "is_payoff"
    t.index ["account_id"], name: "index_financials_on_account_id"
    t.index ["user_id"], name: "index_financials_on_user_id"
  end

  create_table "invites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_invites_on_user_id"
  end

  create_table "nstitches", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "nstitch_user_id"
    t.string "email", default: "", null: false
    t.string "fname"
    t.string "lname"
    t.string "mobile", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_nstitches_on_user_id"
  end

  create_table "plaid_auths", force: :cascade do |t|
    t.string "link_token"
    t.string "public_token"
    t.string "access_token"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "item_id"
    t.index ["access_token"], name: "index_plaid_auths_on_access_token"
    t.index ["created_at"], name: "index_plaid_auths_on_created_at"
    t.index ["link_token"], name: "index_plaid_auths_on_link_token"
    t.index ["public_token"], name: "index_plaid_auths_on_public_token"
    t.index ["user_id"], name: "index_plaid_auths_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "pronoun"
    t.string "phone_number"
    t.boolean "enable_alerts"
    t.string "default_account_id"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "alerts", "users"
  add_foreign_key "credit_scores", "users"
  add_foreign_key "financials", "users"
  add_foreign_key "invites", "users"
  add_foreign_key "nstitches", "users"
  add_foreign_key "plaid_auths", "users"
end

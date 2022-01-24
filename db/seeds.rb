# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: "tanooj@sequincard.com", password: "asdfasdf", first_name: "T", last_name: "L", phone_number: "+18583426377", enable_alerts: true)

financials = Financial.create(
    account_id: "rqwerqgasdfaewr",
    is_overdue: false,
    last_payment_amount: 10.00,
    last_payment_date: Time.now(),
    last_statement_balance: 15.00,
    last_statement_issue_date: Time.now(),
    minimum_payment_amount: 100.00,
    next_payment_due_date: Time.now(),
    user_id: user.id,
    limit: 1000.00,
    current_balance: 100.00,
    is_payoff: false,
    account_name: "American Express Platinum",
    mask: "1234",
)

financials = Financial.create(
    account_id: "rqwerqgasdfaewr",
    is_overdue: false,
    last_payment_amount: 10.00,
    last_payment_date: Time.now(),
    last_statement_balance: 15.00,
    last_statement_issue_date: Time.now(),
    minimum_payment_amount: 100.00,
    next_payment_due_date: Time.now(),
    user_id: user.id,
    limit: 1000.00,
    current_balance: 300.01,
    is_payoff: false,
    account_name: "American Express Platinum",
    mask: "1234",
)

financials = Financial.create(
    account_id: "rqwerqgasdfaewr",
    is_overdue: false,
    last_payment_amount: 10.00,
    last_payment_date: Time.now(),
    last_statement_balance: 15.00,
    last_statement_issue_date: Time.now(),
    minimum_payment_amount: 100.00,
    next_payment_due_date: Time.now(),
    user_id: user.id,
    limit: 1000.00,
    current_balance: 0,
    is_payoff: true,
    account_name: "American Express Platinum",
    mask: "1234",
)


user = User.create(email: "vrinda@sequincard.com", password: "asdfasdf", first_name: "V", last_name: "G", phone_number: "+18583426377", enable_alerts: true)


financials = Financial.create(
    account_id: "asdfalksdjhflaksjfdhasdf",
    is_overdue: false,
    last_payment_amount: 50.00,
    last_payment_date: Time.now(),
    last_statement_balance: 75.00,
    last_statement_issue_date: Time.now(),
    minimum_payment_amount: 100.00,
    next_payment_due_date: Time.now(),
    user_id: user.id,
    limit: 1000.00,
    current_balance: 100.01,
    is_payoff: false,
    account_name: "Chase Saphire Reserve",
    mask: "0987",
)
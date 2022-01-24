class PlaidWorker
  include Sidekiq::Worker

  def perform(user_id = nil)
    # Do something
    # puts "hello"
    # puts Time.now

    @client = Plaid::Client.new(env: ENV["PLAID_ENVIRONMENT"].to_sym,
                                    client_id: ENV["PLAID_CLIENT_ID"],
                                    secret: ENV["PLAID_SECRET"])

    if user_id.nil?
      plaid_auths = PlaidAuth.where.not(access_token: [nil, false, ""])

      plaid_auths.each do |plaid_auth|
        PlaidHelper.fetch_financials(plaid_auth)
      end
    else
      plaid_auth = PlaidAuth.find_by(user_id: user_id)
      PlaidHelper.fetch_financials(plaid_auth)
    end
  end
end

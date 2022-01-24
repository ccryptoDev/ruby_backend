class PlaidAuthsController < ApplicationController
  before_action :set_plaid_auth, only: [:public_token]
  before_action :set_client
  before_action :authorized

  def link_token
    link_token_response = @client.link_token.create(
      user: {
        client_user_id: "#{@user.id}",
        legal_name: @user.legal_name,
        phone_number: @user.phone_number,
        email_address: @user.email
      },
      client_name: 'Sequin',
      products: %w[liabilities],
      country_codes: ['US'],
      language: 'en'
    )

    link_token = link_token_response.link_token
    
    plaid_auth = PlaidAuth.find_by_user_id(@user.id)
  
    if plaid_auth
      plaid_auth.update!(link_token: link_token)
    else
      plaid_auth = PlaidAuth.create!(user_id: @user.id, link_token: link_token)
    end

    render json: plaid_auth
  end

  # POST
  def public_token    
    public_token = params[:public_token]

    response = @client.item.public_token.exchange(public_token)
    access_token = response['access_token']
    item_id = response['item_id']

    @plaid_auth.update!(access_token: access_token, public_token: public_token, item_id: item_id)
  
    PlaidHelper.fetch_financials(@plaid_auth)

    render json: @plaid_auth
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plaid_auth
      @plaid_auth = PlaidAuth.find(params[:id])
    end

    def set_client
      @client = Plaid::Client.new(env: ENV["PLAID_ENVIRONMENT"].to_sym,
                                      client_id: ENV["PLAID_CLIENT_ID"],
                                      secret: ENV["PLAID_SECRET"])
    end
end

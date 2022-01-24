require 'test_helper'

class PlaidAuthsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @plaid_auth = plaid_auths(:one)
  end

  test "should get index" do
    get plaid_auths_url, as: :json
    assert_response :success
  end

  test "should create plaid_auth" do
    assert_difference('PlaidAuth.count') do
      post plaid_auths_url, params: { plaid_auth: { access_token: @plaid_auth.access_token, link_token: @plaid_auth.link_token, public_token: @plaid_auth.public_token, user_id: @plaid_auth.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show plaid_auth" do
    get plaid_auth_url(@plaid_auth), as: :json
    assert_response :success
  end

  test "should update plaid_auth" do
    patch plaid_auth_url(@plaid_auth), params: { plaid_auth: { access_token: @plaid_auth.access_token, link_token: @plaid_auth.link_token, public_token: @plaid_auth.public_token, user_id: @plaid_auth.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy plaid_auth" do
    assert_difference('PlaidAuth.count', -1) do
      delete plaid_auth_url(@plaid_auth), as: :json
    end

    assert_response 204
  end
end

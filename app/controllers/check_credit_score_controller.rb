class CheckCreditScoreController < ApplicationController
  before_action :authorized

  # Customer Login /direct/login
  def direct_login
    
    payload = {
      apikey: '35073e1b-f107-43a1-b0dc-0e600d782b95',
      secret: '1137f1bb-f0c7-40d8-a846-7cce74c4e6c1'
    }
    begin
      response = RestClient.post(
        'https://efx-dev.stitchcredit.com/api/direct/login',
        payload.to_json,
        content_type: :json
      )
      @nstitch = Nstitch.where(email: params[:email]).first
      render json: {response: response, nstitch: @nstitch}
    rescue RestClient::ExceptionWithResponse => err
      case err.http_code
      when 301, 302, 307
        err.response.follow_redirection
      else
        raise
      end
      return render json: {error: "Invalid api key"}
    end

  end

  # Register New User /direct/user-reg
  def direct_user_register
    direct_user_register_body = {
      email: params[:email],
      # mobile: @user.phone_number[2..12],
      fname: params[:first_name],
      lname: params[:last_name],
      mobile: '0000000000',
    }
    begin
      response = RestClient.post('https://efx-dev.stitchcredit.com/api/direct/user-reg', direct_user_register_body.to_json, headers={authorization: 'Bearer ' + params[:token], content_type: :json})

      nstitch_user_id = JSON.parse(response)['userId']
      @nstitch = Nstitch.create(user_id: @user.id, nstitch_user_id: nstitch_user_id, email: 'test@test.com', fname: 'test', lname: 'test', mobile: '98271828939')
      if @nstitch.valid?
        render json: response
      else
        render json: {error: "Invalid email"}
      end
    rescue RestClient::ExceptionWithResponse => err
      case err.http_code
      when 301, 302, 307
        err.response.follow_redirection
      else
        raise
      end
      return render json: {error: "Invalid user info"}
    end

  end

  # New User Token /direct/preauth-token
  def direct_preauth_token
    url = 'https://efx-dev.stitchcredit.com/api/direct/preauth-token/' + params[:user_id]
    begin
      response = RestClient.get(url, headers={
        authorization: 'Bearer ' + params[:token],
        content_type: :json
      })
      return render json: response
    rescue RestClient::ExceptionWithResponse => err
      case err.http_code
      when 301, 302, 307
        err.response.follow_redirection
      else
        raise
      end
      return render json: {error: "Invalid token"}
    end
  end

  # Change Email /direct/change-email
  def direct_change_email
    begin
      direct_change_email_body = {
        email: params[:email],
      }
      response = RestClient.post('https://efx-dev.stitchcredit.com/api/direct/change-email', direct_change_email_body)

      puts (response)
    rescue RestClient::ExceptionWithResponse => err
      case err.http_code
      when 301, 302, 307
        err.response.follow_redirection
      else
        raise
      end
    end
  end

  # Change Phone /direct/change-phone
  def direct_change_phone
    begin
      direct_change_phone_body = {
        phone_number: params[:phone_number],
      }
      response = RestClient.post('https://efx-dev.stitchcredit.com/api/direct/change-phone', direct_change_phone_body)

      puts (response)
    rescue RestClient::ExceptionWithResponse => err
      case err.http_code
      when 301, 302, 307
        err.response.follow_redirection
      else
        raise
      end
    end
  end

  # Close Account /direct/close-account
  def direct_close_account
    begin
      direct_close_account_body = {
        email: params[:email],
        password: params[:password],
        first_name: params[:first_name],
        last_name: params[:last_name],
      }
      response = RestClient.post('https://efx-dev.stitchcredit.com/api/direct/close-account', direct_close_account_body)

      puts (response)
    rescue RestClient::ExceptionWithResponse => err
      case err.http_code
      when 301, 302, 307
        err.response.follow_redirection
      else
        raise
      end
    end
  end

end
class UsersController < ApplicationController
    before_action :authorized, except: [:create, :login]
  
    # REGISTER
    def create
      email = params[:email].downcase
      params[:email] = email

      phone_number = Phonelib.parse(params[:phone_number], 'US')
      if phone_number.invalid?
        return render json: {error: "Invalid phone number"}
      end

      params[:phone_number] = phone_number.full_e164

      @user = User.create({enable_alerts: true}.with_indifferent_access.merge(user_params))
      if @user.valid?
        token = encode_token({user_id: @user.id})
        TwilioHelper.send_welcome_message(@user)
        render json: {user: @user, token: token}
      else
        render json: {error: "Invalid email"}
      end
    end
  
    # LOGGING IN
    def login
      email = params[:email].downcase
      params[:email] = email

      @user = User.find_by(email: params[:email])
  
      if @user && @user.valid_password?(params[:password])
        token = encode_token({user_id: @user.id})
        render json: {user: @user, token: token}
      else
        render json: {error: "Invalid email or password"}
      end
    end
  
  
    def auto_login
      render json: @user
    end

    def enable_alerts
      @user.update!(enable_alerts: true)
      render json: @user
    end

    def disable_alerts
      @user.update!(enable_alerts: false)
      render json: @user
    end

    def update_name
      if params[:first_name] and params[:last_name]
        @user.update!(first_name: params[:first_name], last_name: params[:last_name])
        return render json: @user
      end

      return render json: {error: "Invalid params"}
    end

    def update_default_account_id
      if params[:accountId]
        relevant_financial = Financial.find_by_account_id(params[:accountId])
        if relevant_financial and relevant_financial.user_id == @user.id
          @user.update!(default_account_id: params[:accountId])
          return render json: @user
        end
      end

      return render json: {error: "Invalid params"}
    end
  
    def update_phone_number
      phone_number = Phonelib.parse(params[:phone_number], 'US')
      if phone_number.invalid?
        return render json: {error: "Invalid phone number"}
      end


      @user.update!(phone_number: phone_number)
      render json: @user
    end
  
    private
  
    def user_params
      params.permit(:email, :password, :first_name, :last_name, :phone_number)
    end
  
  end
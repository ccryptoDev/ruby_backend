class PasswordResetsController < ApplicationController
  include Emailer

  before_action :find_user, only: [:edit, :update]
  before_action :authorized, except: [:new, :create, :edit, :update]  

  # POST /password_resets/new
  def new
  end

  # POST /password_resets
  def create
    @user = User.find_by!(email: params[:email].downcase)

    @user.create_reset_digest
    ret = send_password_reset_email(@user)
    if ret
      return render json: { success: true }
    else
      return render json: { error: "An error occured during email delivery" }
    end
  end

  # GET /password_resets/:id/edit
  def edit
    if @user.password_reset_expired?
      return render json: { error: "Password reset link has expired!" } 
    end    
    return render json: { success: true }
  end

  # PATCH /password_resets/:id
  def update
    if @user.password_reset_expired?
      return render json: { error: "Password reset link has expired!" } 
    end    
    # Check if password is valid    
    if params[:password].empty?
      return render json: { error: "Password cannot be empty" }
    elsif params[:password] != params[:confirmPassword]
      # Password does not match password confirmation
      return render json: { error: "Password Confirmation does not match" }      
    elsif @user.reset_password(params[:password], params[:confirmPassword])
      # Successfully reset password
      return render json: { success: true }
    end

    return render json: { error: "Password length should be 6 at least" }
  end

  private

  def find_user    
    @user = User.find_by(reset_digest: User.digest(params[:id]))    
  end

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end  
end

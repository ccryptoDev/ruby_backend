class UserMailer < ApplicationMailer
  default from: Rails.configuration.smtp_sender

  def password_reset(user, url)    
    @user = user
    @url = url
    @color = "#ff6c4b"
    mail to: user.email, subject: "Reset Password"
  end
end

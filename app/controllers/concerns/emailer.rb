module Emailer
  extend ActiveSupport::Concern

  # Sends password reset email.
  def send_password_reset_email(user)
    begin
      UserMailer.password_reset(user, reset_link(user)).deliver_now
    rescue => e
      logger.error "Support: Error in email delivery: #{e}"
      return false
    else
      return true
    end
  end

  private

  def reset_link(user)
    edit_password_reset_url(user.reset_token)
  end
end

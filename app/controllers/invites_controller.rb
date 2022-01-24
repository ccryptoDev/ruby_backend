class InvitesController < ApplicationController
    before_action :authorized

    def create
        email = params[:email]
        p email
        if email !~ URI::MailTo::EMAIL_REGEXP
            return render json: {error: "Invalid email"}
        end

        invite = Invite.create!(user_id: @user.id, email: email)
        return render json: invite
    end
end

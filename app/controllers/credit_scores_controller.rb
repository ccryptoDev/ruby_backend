class CreditScoresController < ApplicationController
    before_action :authorized
    
    def get_all
        return render json: @user.credit_scores.order(id: :desc)
    end

    def create
        score = params[:score].to_i
        if score < 300 || score > 850
            return render json: {error: "Invalid credit score"}
        end
        
        credit_score = CreditScore.create!(user_id: @user.id, score: score)
        return render json: credit_score
    end
end

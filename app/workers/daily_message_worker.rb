class DailyMessageWorker
    include Sidekiq::Worker
  
    def perform(*args)
      puts "DailyMessageWorker"
  
      User.find_each do |user|

        access_token = user.plaid_auths.first.access_token
        if access_token.nil? and 2.days.ago < user.created_at and 1.days.ago > user.created_at
            TwilioHelper.send_connect_plaid(user)
        end

        last_payoff = Financial.where(user_id: user.id, account_id: user.default_account_id, is_payoff: true).limit(1).order(created_at: :desc).first
        cs_count = CreditScore.where(["user_id = ? and created_at > ?", user.id, 23.days.ago]).count
        if last_payoff && 4.days.ago < last_payoff.created_at && 3.days.ago > last_payoff.created_at && cs_count == 0
            TwilioHelper.send_add_credit_score(user)
        end
      end
    end
  end
  
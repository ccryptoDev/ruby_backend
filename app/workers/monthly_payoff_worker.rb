class MonthlyPayoffWorker
  include Sidekiq::Worker

  def perform(*args)
    puts "MonthlyPayoffWorker"
    
    User.find_each do |user|
      
      last_financial = Financial.where(user_id: user.id, account_id: user.default_account_id).limit(1).order(created_at: :desc).first
      if !last_financial
        next
      end

      payment_due_date = last_financial.next_payment_due_date

      begin
        # if 7.days.from_now > payment_due_date and 6.days_from_now < payment_due_date
          # TwilioHelper.send_week_before_payoff(user)
        if 2.days.from_now > payment_due_date and 1.days.from_now < payment_due_date
          TwilioHelper.send_day_before_payoff(user)
        end
      rescue Exception => e
        puts e
      end
    end
  end
end

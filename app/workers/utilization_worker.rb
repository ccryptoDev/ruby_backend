class UtilizationWorker
  include Sidekiq::Worker

  def perform(*args)
    puts "Utilization Worker"
    
    User.find_each do |user|
      
      last_financial = Financial.where(user_id: user.id, account_id: user.default_account_id).limit(1).order(created_at: :desc).first
      if !last_financial
        next
      end
      
      begin
        if last_financial.medium_utilization
          TwilioHelper.send_low_utilization_message(user)
        elsif last_financial.high_utilization
          TwilioHelper.send_high_utilization_message(user)
        end
      rescue Exception => e
        puts e
      end
    end
  end
end

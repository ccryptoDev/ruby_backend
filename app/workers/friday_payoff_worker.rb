class FridayPayoffWorker
  include Sidekiq::Worker

  def perform(*args)
    puts "Friday Payoff Worker"

    User.find_each do |user|
      TwilioHelper.send_friday_payoff(user)
    end
  end
end

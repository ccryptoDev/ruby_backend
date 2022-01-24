class TwilioHelper
    account_sid = ENV["TWILIO_ACCOUNT_SID"]
    auth_token = ENV["TWILIO_AUTH_TOKEN"]
    @from_number = ENV["TWILIO_FROM_NUMBER"]
    
    # set up a client to talk to the Twilio REST API
    @client = Twilio::REST::Client.new account_sid, auth_token
  
    class <<self
        def send_generic(user, type, message)
            p "Attempting to send #{type} message to user:", user.email, user.phone_number, user.enable_alerts
            
            if !user.enable_alerts
                p "User has alerts disabled", user.email, user.phone_number, user.enable_alerts
                return
            end
      
            num_utilization_messages = 0
            if type == 'low_utilization' || type == 'high_utilization'
                last_payoff_success = user.alerts.where(message_type: "payoff_success", user_id: user.id).limit(1).order(id: :desc).first
                if last_payoff_success
                    final_utilization = user.alerts.where(["message_type = ? and id > ?", "final_utilization", last_payoff_success.id]).limit(1).order(id: :desc).first
                    if final_utilization
                        p "already sent finalutilization, let's moveon"
                        return
                    end

                    num_utilization_messages = user.alerts.where(["message_type = ? and id > ?", type, last_payoff_success.id]).count
                elsif
                    p "no last payoff"
                    final_utilization = user.alerts.where(["message_type = ?", "final_utilization"]).limit(1).order(id: :desc).first
                    if final_utilization
                        p "already sent finalutilization, let's moveon"
                        return
                    end
    
                    num_utilization_messages = user.alerts.where(["message_type = ?", type]).count
                end

                if num_utilization_messages >= 2
                    send_final_utilization_message(user)
                    return
                end
            end

            alert = Alert.create!(user_id: user.id, message_type: type, sid: nil, phone_number: user.phone_number)

            begin
              res = @client.messages.create(
                from: @from_number,
                to: user.phone_number,
                body: message
              )
              alert.update!(sid: res.sid)
            rescue Exception => e
              p e
            end      
        end

        def send_friday_payoff(user)
            send_generic(user, "friday_payoff", "Sequin: Today is Sequin’s Friday Credit Card payoff! 🎉\n👉: Pay off your recommended amount at app.sequincard.com.\n📈 : Check & log your new credit score in app.")
        end

        def send_low_utilization_message(user)
            send_generic(user, "low_utilization", "Sequin Payoff Alert ⚠️. Your credit utilization is higher than recommended for excellent credit. Head over to app.sequincard.com for a custom payoff amount.")
        end

        def send_high_utilization_message(user)
            send_generic(user, "high_utilization", "Sequin Payoff Alert ‼️. Your credit utilization has exceeded 30% and may start negatively impacting your credit score. Pay off at app.sequincard.com ASAP.")
        end

        def send_final_utilization_message(user)
            send_generic(user, "final_utilization", "Sequin: We’ll stop the alerts for now, but we encourage you to make a credit card payment ASAP for your best credit health. Help at team@sequincard.com.")
        end

        # def send_week_before_payoff(user)
            # send_generic(user, "week_before_payoff", "You've got one week to pay off your bill")
        # end

        def send_day_before_payoff(user)
            send_generic(user, "day_before_payoff", "Sequin: Today is your monthly credit card payment due date. Head over to app.sequincard.com to pay off any remaining balance (save on interest!).")
        end

        def send_payoff_success(user)
            send_generic(user, "payoff_success", "Sequin: Congrats on making a credit card payment 💸! We love to see it. Head over to app.sequincard.com to track the impacts on your credit history.")
        end

        def send_welcome_message(user)
            send_generic(user, "welcome_message", "Sequin: Welcome! Next, enter your credit card details into the purple box (don’t worry, we’re an official Visa partner). Let’s crush your credit goals 💪.")
        end

        def send_connect_plaid(user)
            send_generic(user, "connect_plaaid", "Sequin: Looks like we’re missing your credit card details in app.sequincard.com. We'll need those to help crush your credit goals. 📈")
        end

        def send_add_credit_score(user)
            send_generic(user, "add_credit_score", "Sequin: We're missing your new credit score at app.sequincard.com. Input your score into the 'track your progress' box to track your credit gains. 📈")
        end

        def send_invite_to_slack(user)
            if Alert.where(user_id: user.id, message_type: "invite_to_slack").count == 0
                # send_generic(user, "invite_to_slack", "Sequin: 💌 Welcome to Sequin’s Slack community! Your exclusive invite awaits. [Need link here].")
            end
        end
    end
end

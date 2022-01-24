class PlaidHelper
    @client = Plaid::Client.new(env: ENV["PLAID_ENVIRONMENT"].to_sym,
        client_id: ENV["PLAID_CLIENT_ID"],
        secret: ENV["PLAID_SECRET"])
  
    class <<self
        def fetch_financials(plaid_auth)
            user = User.find(plaid_auth.user_id)

            access_token = plaid_auth.access_token
            response = @client.liabilities.get(access_token)
      
            accounts = response['accounts']
            p "debug accounts"
            p accounts
            liabilities = response['liabilities']
            p "debug liabilities"
            p liabilities
            credits = liabilities.credit
            
            if !credits || credits.count == 0
              return
            end
            

            # last_financial = Financial.where(["user_id = ?", 2]).last
            # if last_financial
            #   accounts.each do |account|
            #     if last_financial.account_id == account.account_id
            #         cc_account = account
            #     end
            #   end
            # else
              # TODO(tanooj): Confirm what we want to happen if "top of wallet" card
              # gets paid off, like ideally we'd want to keep that one card
              # soo how do we then determine top of wallet?
            max_balance = -100000
            default_account = nil
            p "Accounts:"
            p accounts
            accounts.each do |account|
              p "ACCOUNT INFO"
              p account, account.type, account.balances.current, max_balance
              if account.type == "credit"
                if account.balances.current >= max_balance
                  default_account = account
                  max_balance = account.balances.current
                end
              end
            end
            # end

            p "default account"
            p default_account
                  
            if !default_account
              return
            end
      
            if !user.default_account_id
              user.update({default_account_id: default_account.account_id})
            end
            
            credits.each do |credit|
              cc_account = nil
              accounts.each do |account|
                if account.account_id == credit.account_id
                  cc_account = account
                end
              end

              if !cc_account
                next
              end

              last_financial_for_account = Financial.where(["user_id = ? and account_id = ?", user.id, credit.account_id]).last
              
              is_payoff = false
              if last_financial_for_account
                is_payoff = last_financial_for_account.current_balance > cc_account.balances.current.to_d
              end

              if is_payoff
                TwilioHelper.send_payoff_success(user)
                TwilioHelper.send_invite_to_slack(user)
              end
              
              # p credit, cc_account

              # TODO(tanooj): Check if prev financial is logically equivalent to current one and skip
              limit = cc_account.balances.limit || 10000
              Financial.create!(
                account_id: credit.account_id,
                is_overdue: credit.is_overdue,
                last_payment_amount: credit.last_payment_amount,
                last_payment_date: credit.last_payment_date,
                last_statement_balance: credit.last_statement_balance,
                last_statement_issue_date: credit.last_statement_issue_date,
                minimum_payment_amount: credit.minimum_payment_amount,
                next_payment_due_date: credit.next_payment_due_date,
                user_id: plaid_auth.user_id,
                limit: limit,
                current_balance: cc_account.balances.current,
                account_name: cc_account.official_name || cc_account.name,
                mask: cc_account.mask,
                is_payoff: is_payoff,
              )
              # end
            end
        end
    end
end
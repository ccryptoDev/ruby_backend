class FinancialsController < ApplicationController
  before_action :authorized

  def latest
    return render json: @user.financials.order(id: :desc).first
  end

  def get_all
    account_ids = @user.financials.pluck(:account_id).uniq

    all_financials = []

    account_ids.each do |account_id|
      financials = Financial.where(["user_id = ? and account_id = ?", @user.id, account_id]).order(id: :desc)
      # p "financials:", financials.length, account_id, @user.id

      prev_utilization = 0
      prev_balance = 0
      financials.reverse_each do |financial|
        financial.prev_utilization = prev_utilization
        financial.delta = financial.current_balance - prev_balance
        prev_utilization = financial.utilization
        prev_balance = financial.current_balance
      end

      all_financials += financials

    end

    return render json: all_financials
  end

  def refresh
    delay = 0.minutes
    if params[:delay]
      delay = params[:delay].to_i.minutes
    end

    PlaidWorker.perform_in(delay, @user.id)
  end
end

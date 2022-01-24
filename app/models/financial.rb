class Financial < ApplicationRecord
    belongs_to :user
    attr_accessor :prev_utilization
    attr_accessor :delta

    def recommended_payoff
        if low_utilization
            return self.current_balance
        elsif high_utilization
            return self.current_balance - (0.25 * self.limit)
        else
            return self.current_balance - (0.10 * self.limit)
        end
    end
    
    def utilization
        self.current_balance / self.limit
    end

    def low_utilization
        self.utilization < 0.10
    end

    def medium_utilization
        self.utilization >= 0.10 && self.utilization < 0.3
    end

    def high_utilization
        self.utilization >= 0.3
    end

    def as_json(options = { })
        h = super(options)
        h[:recommended_payoff] = self.recommended_payoff
        h[:utilization] = self.utilization
        h[:prev_utilization] = self.prev_utilization
        h[:delta] = self.delta
        h
    end      
end

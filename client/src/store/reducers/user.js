import {
  USER_AUTO_LOGIN,
  USER_GET_FINANCIALS,
  USER_GET_CREDIT_SCORES,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_RESET_PASSWORD_CREATE,
  USER_RESET_PASSWORD_UPDATE,
  USER_UPDATE_DEFAULT_ACCOUNT,
  USER_SAVE_CREDIT_SCORE,
} from "../actions/user.actions";
import amplitude from 'amplitude-js';

export const DEFAULT_STATE = {
  details: undefined,
  financials: undefined,
  creditScores: undefined,
  error: undefined,
  isLoading: false,
  isLoadingFinancials: false,
  isLoadingCreditScores: false,
  token: undefined,
};

const userReducer = (state = DEFAULT_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_LOGOUT:
      amplitude.getInstance().setUserId(null)

      window.localStorage.removeItem("sequin_token");
      return DEFAULT_STATE;
    case `${USER_LOGIN}_REQ`:
      return {
        ...state,
        details: undefined,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${USER_LOGIN}_ACK`:
      window.localStorage.setItem("sequin_token", payload?.token);
      return {
        ...state,
        details: {
          email: payload?.user?.email,
          firstName: payload?.user?.first_name,
          id: payload?.user?.id,
          lastName: payload?.user?.last_name,
          phoneNumber: payload?.user?.phone_number,
          pronoun: payload?.user?.pronoun,
          defaultAccountId: payload?.user?.default_account_id,
          enableAlerts: payload?.user?.enable_alerts
        },
        financials: payload?.financials,
        error: payload?.error,
        isLoading: false,
        token: payload?.token,
      };
    case `${USER_LOGIN}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error logging in",
        isLoading: false,
        token: undefined,
      };
    case `${USER_REGISTER}_REQ`:
      return {
        ...state,
        details: undefined,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${USER_REGISTER}_ACK`:
      window.localStorage.setItem("sequin_token", payload?.token);
      return {
        ...state,
        details: {
          email: payload?.user?.email,
          firstName: payload?.user?.first_name,
          id: payload?.user?.id,
          lastName: payload?.user?.last_name,
          phoneNumber: payload?.user?.phone_number,
          pronoun: payload?.user?.pronoun,
          defaultAccountId: payload?.user?.default_account_id,
          enableAlerts: payload?.user?.enable_alerts
        },
        error: payload?.error,
        isLoading: false,
        token: payload?.token,
      };
    case `${USER_REGISTER}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error registering new user",
        isLoading: false,
        token: undefined,
      };
    case `${USER_RESET_PASSWORD_CREATE}_REQ`:
      return {
        ...state,        
        error: undefined,
        isLoading: true,
      };
    case `${USER_RESET_PASSWORD_CREATE}_ACK`:      
      return {
        ...state,                
        error: payload?.error,
        isLoading: false,        
      };
    case `${USER_RESET_PASSWORD_CREATE}_ERR`:
      return {
        ...state,        
        error: "Error resetting password",
        isLoading: false,        
      };
    case `${USER_RESET_PASSWORD_UPDATE}_REQ`:
        return {
          ...state,          
          error: undefined,
          isLoading: true,          
        };
      case `${USER_RESET_PASSWORD_UPDATE}_ACK`:        
        return {
          ...state,          
          error: payload?.error,
          isLoading: false,          
        };
      case `${USER_RESET_PASSWORD_UPDATE}_ERR`:
        return {
          ...state,
          error: "Error resetting password",
          isLoading: false,          
        };
    case `${USER_AUTO_LOGIN}_REQ`:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case `${USER_AUTO_LOGIN}_ACK`:
      return {
        ...state,
        details: {
          email: payload?.user?.email,
          firstName: payload?.user?.first_name,
          id: payload?.user?.id,
          lastName: payload?.user?.last_name,
          phoneNumber: payload?.user?.phone_number,
          pronoun: payload?.user?.pronoun,
          defaultAccountId: payload?.user?.default_account_id,
          enableAlerts: payload?.user?.enable_alerts
        },
        error: undefined,
        financials: payload?.financials,
        isLoading: false,
        token: window.localStorage.getItem("sequin_token"),
      };
    case `${USER_AUTO_LOGIN}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error with auto login",
        isLoading: false,
      };
    case `${USER_GET_FINANCIALS}_REQ`:
      return {
        ...state,
        error: undefined,
        isLoadingFinancials: true,
      };
    case `${USER_GET_FINANCIALS}_ACK`:
      return {
        ...state,
        error: undefined,
        financials: payload.length
          ? payload.map((bankAccount) => ({
              accountId: bankAccount.account_id,
              accountName: bankAccount.account_name,
              currentBalance: bankAccount.current_balance,
              isOverdue: bankAccount.is_overdue,
              lastPaymentAmount: bankAccount.last_payment_amount,
              lastPaymentDate: bankAccount.last_payment_date,
              lastStatementBalance: bankAccount.last_statement_balance,
              lastStatementIssueDate: bankAccount.last_statement_issue_date,
              limit: bankAccount.limit,
              mask: bankAccount.mask,
              minimumPaymentAmount: bankAccount.minimum_payment_amount,
              nextPaymentDueDate: bankAccount.next_payment_due_date,
              recommendedPayoff: bankAccount.recommended_payoff,
              updatedAt: bankAccount.updated_at,
              utilization: bankAccount.utilization,
              prevUtilization: bankAccount.prev_utilization,
              isPayoff: bankAccount.is_payoff,
              delta: bankAccount.delta
            }))
          : undefined,
        isLoadingFinancials: false,
      };
    case `${USER_GET_FINANCIALS}_ERR`:
      return {
        ...state,
        financials: undefined,
        error: "Error getting financials",
        isLoadingFinancials: false,
      };
    case `${USER_GET_CREDIT_SCORES}_REQ`:
      return {
        ...state,
        error: undefined,
        isLoadingCreditScores: true
      };
    case `${USER_GET_CREDIT_SCORES}_ACK`:
      return {
        ...state,
        error: undefined,
        creditScores: payload.length
          ? payload.map((creditScore) => (
            {
              score: creditScore.score,
              date: creditScore.created_at,
              id: creditScore.id,
            }
          ))
          : [],
        isLoadingCreditScores: false,
      }
    case `${USER_SAVE_CREDIT_SCORE}_REQ`:
      return {
        ...state
      }
    case `${USER_SAVE_CREDIT_SCORE}_ACK`:
      // var cs = state.creditScores
      var newScore = {id: payload.id, score: payload.score, date: payload.created_at}
      return {
        ...state,
        error: undefined,
        creditScores: [newScore, ...state.creditScores]
      }  
    case `${USER_GET_CREDIT_SCORES}_ERR`:
      return {
        ...state,
        creditScores: undefined,
        error: "Error getting credit scores.",
        isLoadingCreditScores: false,
      };
    case `${USER_UPDATE_DEFAULT_ACCOUNT}_REQ`:
      return {
        ...state,
      };
    case `${USER_UPDATE_DEFAULT_ACCOUNT}_ACK`:
      var details = state.details
      details.defaultAccountId = payload?.user?.default_account_id
      return {
        ...state,
        details: details
     }
    case `${USER_UPDATE_DEFAULT_ACCOUNT}_ERR`:
      return {
        ...state,
        error: "Error updating default account.",
      };
    default:
      return state;
  }
};

export default userReducer;

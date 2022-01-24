Rails.application.routes.draw do
  # resources :plaid_auths
  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resource :users, only: [:create]
  post "/login", to: "users#login"
  get "/auto_login", to: "users#auto_login"

  # Password reset resources.
  resources :password_resets, only: [:new, :create, :edit, :update]

  post "/users/alerts/enable", to: "users#enable_alerts"
  post "/users/alerts/disable", to: "users#disable_alerts"
  post "/users/name", to: "users#update_name"
  post "/users/phone_number", to: "users#update_phone_number"
  post "/users/default_account_id", to: "users#update_default_account_id"

  get '/plaid/link_token', to: 'plaid_auths#link_token'
  put '/plaid/public_token/:id', to: 'plaid_auths#public_token'  

  get '/financials/all', to: 'financials#get_all'
  get '/financials/latest', to: 'financials#latest'
  get '/financials/refresh', to: 'financials#refresh'
  get '/financials/refresh/:delay', to: 'financials#refresh'

  get '/credit_score/all', to: 'credit_scores#get_all'
  post '/credit_score', to: 'credit_scores#create'

  post '/invites', to: "invites#create"

  # direct api
  # login
  post '/direct_login', to: 'check_credit_score#direct_login'
  # new user token
  post '/direct_preauth_token', to: 'check_credit_score#direct_preauth_token'
  # user register
  post '/direct_user_register', to: 'check_credit_score#direct_user_register'
  # change email
  post '/direct_change_email', to: 'check_credit_score#direct_change_email'
  # change phone
  post '/direct_change_phone', to: 'check_credit_score#direct_change_phone'
  # close account
  post '/direct_close_account', to: 'check_credit_score#direct_close_account'

  match '*all', to: 'static#index', via: [:get]
end

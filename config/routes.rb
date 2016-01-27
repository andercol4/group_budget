Rails.application.routes.draw do
  root 'dashboard#index'
  resources :bills
  resources :user_bills
  put '/bills_paid/:id', to: 'user_bills#pay_bill', as: 'pay_bill'
  resources :comments
  resources :groups
  post '/groups/:id/invite', to: 'groups#invite', as: 'invite'
  resources :user_groups
  
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end

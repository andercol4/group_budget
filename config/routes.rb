Rails.application.routes.draw do
  root 'dashboard#landing'
  get "dashboard", to: "dashboard#index", as: "dashboard"
  get "about_us", to: "dashboard#about", as: "about"
  get "faq", to: "dashboard#faq", as: "faq"
  get "landing", to: "dashboard#landing", as: "landing"
  get "charts", to: "dashboard#charts", as: "charts"
  resources :bills
  resources :user_bills
  put '/bills_paid/:id', to: 'user_bills#pay_bill', as: 'pay_bill'
  resources :comments
  resources :groups
  post '/groups/:id/invite', to: 'groups#invite', as: 'invite'
  resources :user_groups

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", registrations: 'registrations' }
end

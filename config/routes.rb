Rails.application.routes.draw do
  root 'dashboard#index'
  resources :bills
  resources :user_bills
  resources :comments
  resources :groups
  post '/groups/:id/invite', to: 'groups#invite', as: 'invite'
  resources :user_groups
  devise_for :users, :controllers => {registrations: 'registrations'}
end

Rails.application.routes.draw do
  root 'dashboard#index'
  resources :bills
  resources :user_bills
  resources :comments
  resources :groups
  resources :user_groups
  devise_for :users, :controllers => {registrations: 'registrations'}
end

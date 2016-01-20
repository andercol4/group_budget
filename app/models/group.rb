class Group < ActiveRecord::Base
  has_many :bills, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups
end

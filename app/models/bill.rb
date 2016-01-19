class Bill < ActiveRecord::Base
  belongs_to :group
  has_many :user_groups
  has_many :users, through: :user_groups
end

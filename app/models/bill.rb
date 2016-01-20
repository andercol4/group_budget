class Bill < ActiveRecord::Base
  belongs_to :group
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups
end

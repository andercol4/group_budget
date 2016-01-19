class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_uniqueness_of :username
  validates_presence_of :username, :first_name

  has_many :comments
  has_many :user_bills
  has_many :bills, through: :user_bills
  has_many :user_groups
  has_many :groups, through: :user_groups


end

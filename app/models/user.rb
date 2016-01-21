class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates_uniqueness_of :username
  validates_presence_of :username, :first_name

  has_many :comments, dependent: :destroy
  has_many :user_bills, dependent: :destroy
  has_many :bills, through: :user_bills
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups

  def upcoming_bills(date = 1)
    bills = self.bills.where("due_date <= ?",date.weeks.from_now)
  end


end

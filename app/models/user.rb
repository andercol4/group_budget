class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]
  
  validates_uniqueness_of :username
  validates_presence_of :username, :first_name

  has_many :comments, dependent: :destroy
  has_many :user_bills, dependent: :destroy
  has_many :bills, through: :user_bills
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups

  def upcoming_bills(date = 1)
    self.bills.where("due_date <= ?",date.weeks.from_now)
  end

  def upcoming_bills1
    bills = self.bills.select("bills.*, ub.amount_owed, ub.is_paid as debt_paid, u.first_name")
        .joins("INNER JOIN user_bills ub ON ub.bill_id = bills.id")
        .joins("INNER JOIN users u ON u.id = bills.creator_id")
        .where("ub.user_id = ?", self.id)
        .order("due_date")
    bills
  end

  def bills_created(current_user_id)
    self.bills.select('bills.*')
               .where('creator_id =?', current_user_id)
  end
  
  def self.from_omniauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.password = Devise.friendly_token[0,20]
      end
  end

end

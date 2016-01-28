class Bill < ActiveRecord::Base
  belongs_to :group
  has_many :user_bills, dependent: :destroy
  has_many :users, through: :user_bills

  def divide_bill
    #get group
    group = Group.find(self.group_id)
    count = group.users.count
    split_cost = self.amount_total / count
    user_bill = []
    group.users.each do |user|
      user_bill << UserBill.create(user_id: user.id, bill_id: self.id, amount_owed: split_cost)
    end
    user_bill
  end

  # def self.sqlcall(id)
  #       select("bills.*, ub.amount_owed, ub.is_paid as debt_paid, u.first_name")
  #       .joins("INNER JOIN user_bills ub ON ub.bill_id = bills.id")
  #       .joins("INNER JOIN users u ON u.id = bills.creator_id")
  #       .where("ub.id = ?", id)
  #       .order("due_date")
  # end
end

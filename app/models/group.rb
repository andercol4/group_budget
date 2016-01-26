class Group < ActiveRecord::Base
  has_many :bills, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups

  def bills_breakdown
    bills = self.bills.select("bills.*, ub.amount_owed, ub.is_paid as debt_paid, u.first_name, ub.id AS ub_id")
        .joins("INNER JOIN user_bills ub ON ub.bill_id = bills.id")
        .joins("INNER JOIN users u ON u.id = bills.creator_id")
        .joins("INNER JOIN groups g ON g.id = bills.group_id")
        .where("g.id = ? AND g.creator_id = u.id", self.id)
        .order("due_date")
    bills
  end
end

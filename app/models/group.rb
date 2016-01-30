class Group < ActiveRecord::Base
  has_many :bills, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups

  def bills_breakdown
    bills = self.bills.select("bills.*, u.first_name")
        .joins("INNER JOIN user_bills ub ON ub.bill_id = bills.id")
        .joins("INNER JOIN users u ON u.id = bills.creator_id")
        .joins("INNER JOIN groups g ON g.id = bills.group_id")
        .where("g.id = ? AND ub.user_id = bills.creator_id", self.id)
        .order("due_date")
    bills
    @bills = []
    bills.map do |b|
      @bills.push({
        amount_paid:  b.amount_paid,
        amount_total:  b.amount_total,
        creator_id:  b.creator_id,
        due_date:  b.due_date,
        first_name:  b.first_name,
        group_id: b.group_id,
        id:  b.id,
        is_paid: b.is_paid,
        name: b.name,
        recurring: b.recurring,
        user_bills: b.user_bills.map do |ub|
          {username: User.find(ub.user_id).first_name,
          amount_owed: ub.amount_owed,
          user_id: ub.user_id,
          ub_id: ub.id,
          is_paid: ub.is_paid}
        end
      })
    end
      @bills
  end
end

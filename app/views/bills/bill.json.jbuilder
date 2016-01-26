json.bill do
  json.amount_owed  @user_bill.amount_owed
  json.amount_paid  @bill.amount_paid
  json.amount_total  @bill.amount_total
  json.creator_id  @bill.creator_id
  json.debt_paid  @user_bill.is_paid
  json.due_date  @bill.due_date
  json.first_name  @user.first_name
  json.group_id @group.id
  json.id  @bill.id
  json.is_paid @bill.is_paid
  json.name @bill.name
  json.recurring @bill.recurring
  json.user_bills @user_bills do |ub|
    @bill.user_bills.each do |ub|
      json.username User.find(ub.user_id).first_name
      json.amount_owed ub.amount_owed
      json.ub_id ub.id
      json.is_paid ub.is_paid
    end
  end
end

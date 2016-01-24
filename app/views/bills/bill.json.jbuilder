json.bill do
  json.amount_owed  @user_bill.amount_owed
  json.amount_paid  @bill.amount_paid
  json.amount_total  @bill.amount_total
  json.creator_id  @bill.creator_id
  json.debt_paid  @user_bill.is_paid
  json.due_date  @bill.is_paid
  json.first_name  @user.first_name
  json.group_id @group.id
  json.id  @bill.id
  json.is_paid @bill.is_paid
  json.name @bill.name
  json.recurring @bill.recurring
end

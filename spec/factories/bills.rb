FactoryGirl.define do
  factory :bill do
  due_date "2016-01-19"
  is_paid false
  recurring false
  name "Bill1"
  group
  amount_total 100
  amount_paid 0
  creator_id nil
  end

end

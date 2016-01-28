FactoryGirl.define do
  factory :user_bill do
  user
  bill
  amount_owed 50
  amount_paid 50
  is_paid false
  end

end

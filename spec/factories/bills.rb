FactoryGirl.define do
  factory :bill do
    due_date "2016-01-19"
is_paid false
recurring false
name "MyString"
group nil
amount_total 1.5
amount_paid 1.5
  end

end

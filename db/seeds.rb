# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.destroy_all
Group.destroy_all
10.times do |i|
user = User.create(username: "User#{i}",
   email:"user#{i}@email.com",
  first_name: "User#{i}",
  :password => "password",
  password_confirmation: 'password',
  last_name: 'Hancock')
  group = Group.create(name: "User#{i} Personal")
  UserGroup.create(user_id: user.id, group_id: group.id)
  20.times do |j|
    bill = Bill.create(name: "bill#{i}-#{j}", due_date: j.day.from_now, group_id: group.id, amount_total: j*10)
    UserBill.create(user_id: user.id, bill_id: bill.id, amount_owed: 100.0)
    end
end

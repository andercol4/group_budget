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
  password: "password",
  password_confirmation: 'password',
  last_name: 'Hancock')
  group = Group.create(name: "User#{i} Personal", creator_id: user.id)
  UserGroup.create(user_id: user.id, group_id: group.id)
  20.times do |j|
    bill = Bill.create(name: "bill#{i}-#{j}", due_date: j.day.from_now, group_id: group.id, amount_total: j*10, creator_id: user.id)
    UserBill.create(user_id: user.id, bill_id: bill.id, amount_owed: j*10)
    end
end

#create two users with personal_group and bills
james = User.create(username: "jimibue",
  email:"jimibue@gmail.com",
  first_name: "James",
  password: "password",
  password_confirmation: 'password',
  last_name: 'Yeates')
  group = Group.create(name: "#{james.username} Personal", creator_id: james.id)
  UserGroup.create(user_id: james.id, group_id: group.id)
 
5.times do |j|
    bill = Bill.create(name: "James bill #-#{j}", due_date: j.day.from_now, group_id: group.id, amount_total: j*10,creator_id: james.id)
    UserBill.create(user_id: james.id, bill_id: bill.id, amount_owed: j*10)
  end  
summer = User.create(username: "summer",
  email:"summer@gmail.com",
  first_name: "Summer",
  password: "password",
  password_confirmation: 'password',
  last_name: 'Williams')
  group = Group.create(name: "#{summer.username} Personal",creator_id: summer.id) 
  UserGroup.create(user_id: summer.id, group_id: group.id)

5.times do |j|
    bill = Bill.create(name: "Summer bill #-#{j}", due_date: j.day.from_now, group_id: group.id, amount_total: j*10,creator_id: summer.id)
    UserBill.create(user_id: summer.id, bill_id: bill.id, amount_owed: j*10)
  end   
 
 #create group between two users
 sj_group = Group.create(name:'summer james group',creator_id: summer.id) 

 UserGroup.create(user_id: james.id, group_id: sj_group.id)
 UserGroup.create(user_id: summer.id, group_id: sj_group.id)

 sj_bill1 = Bill.create(name: 'sum-j-bill1', due_date: 1.week.from_now, group_id: sj_group.id, amount_total: 200, creator_id: summer.id)
 UserBill.create(user_id: summer.id, bill_id: sj_bill1.id, amount_owed: sj_bill1.amount_total/2 )
 UserBill.create(user_id: james.id, bill_id: sj_bill1.id, amount_owed:  sj_bill1.amount_total/2 )

 sj_bill2 = Bill.create(name: 'jam-s-bill2', due_date: 1.week.from_now, group_id: sj_group.id, amount_total: 200, creator_id: james.id)
 UserBill.create(user_id: summer.id, bill_id: sj_bill2.id, amount_owed: 0, amount_paid: 100, is_paid: true )
 UserBill.create(user_id: james.id, bill_id: sj_bill2.id, amount_owed:  sj_bill2.amount_total/2 )

 sj_bill3 = Bill.create(name: 'jam-s-bill3', due_date: 1.week.from_now, group_id: sj_group.id, amount_total: 200, creator_id: james.id)
 UserBill.create(user_id: summer.id, bill_id: sj_bill3.id, amount_owed: sj_bill3.amount_total/2 )
 UserBill.create(user_id: james.id, bill_id: sj_bill3.id, amount_owed: 0, amount_paid: 100, is_paid: true )

sj_bill4 = Bill.create(name: 'sum-j-bill4', due_date: 1.day.from_now, group_id: sj_group.id, amount_total: 200,creator_id: summer.id, amount_paid:200, is_paid: true)
 UserBill.create(user_id: summer.id, bill_id: sj_bill4.id, amount_owed: 0, amount_paid: 100, is_paid: true )
 UserBill.create(user_id: james.id, bill_id: sj_bill4.id, amount_owed: 0, amount_paid: 100, is_paid: true )


  #create group between two users
 j_group = Group.create(name:'random james group', creator_id: james.id) 
 user0 = User.find_by(username: 'User0')
 user1 = User.find_by(username: 'User1')

 UserGroup.create(user_id: james.id, group_id: j_group.id)
 UserGroup.create(user_id: user0 .id, group_id: j_group.id)
 UserGroup.create(user_id: user1 .id, group_id: j_group.id)

 sj_bill1 = Bill.create(name: 'rj-bill1', due_date: 1.week.from_now, group_id: j_group.id, amount_total: 100,creator_id: james.id)
 UserBill.create(user_id: user0 .id, bill_id: sj_bill1.id, amount_owed: sj_bill1.amount_total/3 )
 UserBill.create(user_id: user1 .id, bill_id: sj_bill1.id, amount_owed: sj_bill1.amount_total/3 )
 UserBill.create(user_id: james.id, bill_id: sj_bill1.id, amount_owed:  sj_bill1.amount_total/3 )

 sj_bill2 = Bill.create(name: 'rj-bill2', due_date: 2.week.from_now, group_id: j_group.id, amount_total: 200,creator_id: james.id)
 UserBill.create(user_id: user0.id, bill_id: sj_bill2.id, amount_owed: sj_bill2.amount_total/3 )
 UserBill.create(user_id: user1.id, bill_id: sj_bill2.id, amount_owed: sj_bill2.amount_total/3 )
 UserBill.create(user_id: james.id, bill_id: sj_bill2.id, amount_owed:  sj_bill2.amount_total/3 )

 sj_bill3 = Bill.create(name: 'rj-bill3', due_date: 3.week.from_now, group_id: sj_group.id, amount_total: 200,creator_id: user0.id)
 UserBill.create(user_id: user0.id, bill_id: sj_bill3.id, amount_owed: sj_bill3.amount_total/3 )
 UserBill.create(user_id: user1.id, bill_id: sj_bill3.id, amount_owed: sj_bill3.amount_total/3 )
 UserBill.create(user_id: james.id, bill_id: sj_bill3.id, amount_owed:  sj_bill3.amount_total/3 )





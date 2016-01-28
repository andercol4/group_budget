require 'rails_helper'

RSpec.describe Bill, type: :model do
  let(:user){User.create(username: "User1",
    email:"user1@email.com",
    first_name: "User1",
    password: "password",
    password_confirmation: 'password',
    last_name: 'Hancock')}
  let(:group){group = Group.create(name: "User1 Personal", creator_id: user.id)}
  let(:user_group){UserGroup.create(user_id: user.id, group_id: group.id)}
  let(:bill){Bill.create(name: "bill1", due_date: 10.day.from_now, group_id: group.id, amount_total: 100, creator_id: user.id)}
  describe 'model methods' do
    it 'divide bill creates user bills for all current group members' do
      user_group
      group
      user
      userbill = bill.divide_bill
      expect(userbill.first.amount_owed).to eq(100.0)
    end
  end
end

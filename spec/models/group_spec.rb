require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'sql queries' do
    let(:user) {User.create(username: "UserH",
      email:"user@email.com",
      first_name: "User",
      password: "password",
      password_confirmation: 'password',
      last_name: 'Hancock')}
    let(:group) {Group.create(name: "UserH Personal", creator_id: user.id)}
    let(:bill) {Bill.create(name: "bill", due_date: 1.day.from_now, group_id: group.id, amount_total: 10, creator_id: user.id)}
    let(:bill2) {Bill.create(name: "bill2", due_date: 2.days.from_now, group_id: group.id, amount_total: 20, creator_id: user.id)}
    let(:ub) {UserBill.create(user_id: user.id, bill_id: bill.id, amount_owed: 10)}
    let(:ub2) {UserBill.create(user_id: user.id, bill_id: bill2.id, amount_owed: 20)}
    # TODO: finish testing group.rb
    it 'runs the method and returns b in order, u first_name' do
      user
      group
      bill
      bill2
      ub
      ub2
      # bills_breakdown is undefined method... why?!?!
      method = user.bills_breakdown
      # the method returns an array of hashes? so we may have to grab the values this way.
      expect(method.first[:amount_total]).to eq(10)
      # expect(method.last.amount_total).to eq(20)
      # expect(method.first.first_name).to eq('User')
    end
  end
end

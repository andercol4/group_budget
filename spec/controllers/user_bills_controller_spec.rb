require 'rails_helper'

RSpec.describe UserBillsController, type: :controller do

  describe 'pay_bill method' do
    let(:user1){User.create(username: "User1",
      email:"user1@email.com",
      first_name: "User1",
      password: "password",
      password_confirmation: 'password',
      last_name: 'Hancock')}
    let(:user2){User.create(username: "User2",
      email:"user2@email.com",
      first_name: "User2",
      password: "password",
      password_confirmation: 'password',
      last_name: 'Hancock')}
    let(:group){Group.create(name: "House", creator_id: user1.id)}
    let(:ug1){UserGroup.create(user_id: user1.id, group_id: group.id)}
    let(:ug2){UserGroup.create(user_id: user2.id, group_id: group.id)}
    let(:bill){Bill.create(name: "Rent", due_date: 5.day.from_now, group_id: group.id, amount_total: 100, creator_id: user1.id)}
    let(:ub1){UserBill.create(user_id: user1.id, bill_id: bill.id, amount_owed: 50)}
    let(:ub2){UserBill.create(user_id: user2.id, bill_id: bill.id, amount_owed: 50)}


    before(:each) do
      controller.class.skip_before_filter :authenticate_user!
      sign_in user1
    end

    it 'marks userbills paid accordingly' do
      user1
      group
      ug1
      bill
      ub1
      put :pay_bill, {id: bill.id, user_bill: {amount_paid: 50}}
      # binding.pry
      body = JSON.parse(response.body)
      expect(response).to be_success
      expect(body['user_bill']['is_paid']).to eq(true)
    end
    it 'marks bill as paid when it is paid in full' do
      user1
      group
      ug1
      bill_single = Bill.create(name: "Rent", due_date: 5.day.from_now, group_id: group.id, amount_total: 50, creator_id: user1.id)
      ub = UserBill.create(user_id: user1.id, bill_id: bill_single.id, amount_owed: 50)
      # binding.pry
      put :pay_bill, {id: bill_single.id, user_bill: {amount_paid: 50}}
      expect(response).to be_success
      body = JSON.parse(response.body)
      expect(body['bill']['is_paid']).to eq(true)
    end
    it 'makes a new bill if recurring is true' do
      user1
      group
      ug1
      bill_single = Bill.create(name: "Rent", due_date: 5.day.from_now, group_id: group.id, amount_total: 50, creator_id: user1.id, recurring: true)
      ub = UserBill.create(user_id: user1.id, bill_id: bill_single.id, amount_owed: 50)
      # binding.pry
      put :pay_bill, {id: bill_single.id, user_bill: {amount_paid: 50}}
      expect(response).to be_success
      body = JSON.parse(response.body)
      expect(body['new_bill']['is_paid']).to eq(false)
      expect(body['new_bill']['name']).to eq('Rent')
    end
  end

end

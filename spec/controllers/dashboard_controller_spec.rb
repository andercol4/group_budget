require 'rails_helper'

RSpec.describe DashboardController, type: :controller do
  let(:user) {User.create(username: "UserH",
    email:"user@email.com",
    first_name: "User",
    password: "password",
    password_confirmation: 'password',
    last_name: 'Hancock')}
  let(:group) {Group.create(name: "UserH Personal", creator_id: user.id)}
  let(:ug) {UserGroup.create(user_id: user.id, group_id: group.id)}
  let(:comment) {Comment.create(body: "Hello", group_id: group.id, user_id: user.id)}

  # before(:each) do
  #   controller.class.skip_before_filter :authenticate_user!
  #   sign_in user
  # end

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "sets the groups instance variable" do
      controller.class.skip_before_filter :authenticate_user!
      sign_in user
      group
      ug
      get :index, current_user: user.groups
      expect(assigns(:groups)).to eq(user.groups)
    end
  end

end

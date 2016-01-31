require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  let(:user) {User.create(username: "UserH",
    email:"user@email.com",
    first_name: "User",
    password: "password",
    password_confirmation: 'password',
    last_name: 'Hancock')}
  let(:group) {Group.create(name: "UserH Personal", creator_id: user.id)}
  let(:comment) {Comment.create(body: "Hello", group_id: group.id, user_id: user.id)}

  before(:each) do
    controller.class.skip_before_filter :authenticate_user!
    sign_in user
    group
    comment
  end

  describe "GET #index" do
    # http success doesnt work with render json
    # it "returns http success" do
    #   get :index
    #   expect(response).to have_http_status(:success)
    # end

    it 'assigns the group instance variable' do
      get :index, group_id: group.id
      expect(assigns(:group)).to eq(group)
    end

    it 'assigns the comments instance variable' do
      get :index, group_id: group.id
      expect(assigns(:comments)).to eq(group.comments)
    end
  end

  describe "GET #create" do
    # http success doesnt work with render json
    # it "returns http success" do
    #   get :create
    #   expect(response).to have_http_status(:success)
    # end

    it 'assigns the group instance variable' do
      post :create, comment: comment.attributes, group_id: group.id
      expect(assigns(:group)).to eq(group)
    end

    it 'assigns the comment instance variable' do
      post :create, group_id: group.id, user_id: user.id, comment: comment.attributes
      expect(assigns(:comment)).to eq(group.comments.last)
    end

    # TODO
    # it 'tests the render json in the else statement' do
    #
    # end
  end

# not doing an edit comment 
  # describe "GET #update" do
  #   # http success doesnt work with render json
  #   # it "returns http success" do
  #   #   get :update
  #   #   expect(response).to have_http_status(:success)
  #   # end
  #
  #   it 'assigns the comment instance variable' do
  #     put :update, id: comment.id, comment: comment.attributes
  #     expect(assigns(:comment)).to eq(comment)
  #   end
  #
  #   it 'checks if update comment is true' do
  #     put :update, id: comment.id, comment: comment.attributes, :format => :json
  #     expect(response).to be_success
  #   end
  #
  #   # TODO
  #   # it 'tests the render json in the else statement' do
  #   #
  #   # end
  # end

  #  not doing a delete comment anymore
  # describe "GET #destroy" do
  #   # http success doesnt work with render json
  #   # it "returns http success" do
  #   #   get :destroy
  #   #   expect(response).to have_http_status(:success)
  #   # end
  #
  #   it 'assigns the comment instance variable' do
  #     delete :destroy, id: comment.id, comment: comment.attributes
  #     expect(assigns(:comment)).to eq(comment)
  #   end
  #
  #   it 'destroys the comment' do
  #     binding.pry
  #     delete :destroy, id: comment.id, comment: comment.attributes
  #     expect(comment.length).to eq(0)
  #   end
  # end
end

class GroupsController < ApplicationController
  before_action :group, except: [:index, :create]
  def index
    @groups = current_user.groups
  end

  def show
    @comments = @group.comments
    @bills = current_user.upcoming_bills1
  end

  def create
    # binding.pry
    @group = Group.new(group_params)
    @group.creator_id = current_user.id
    if @group.save
      UserGroup.create({user_id: current_user.id, group_id: @group.id})
      render json: @group
    else
      redirect_to root_path
    end
  end

  def update
    if @group.creator_id == current_user.id
      if @group.update(group_params)
        render json: @group
      else
        render :edit
      end
    else
      render json: {error: 'Not the creator.'}
    end
  end

  def invite
    @user = User.find_by(email: params[:email])
    # binding.pry
    @connection = UserGroup.find_by({user_id: @user.id, group_id: @group.id})
    if @user && @connection == nil
      UserGroup.create({group_id: @group.id, user_id: @user.id})
      head :ok
    else
      render json: {error: 'User not in database.'}
    end
  end

  def destroy
    if @group.creator_id == current_user.id
      if @group.destroy
        head :ok
      else
        redirect_to groups_path
      end
    else
      render json: {error: 'Not the creator.'}
    end
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end

  def group
    @group = Group.find(params[:id])
  end

end

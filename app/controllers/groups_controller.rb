class GroupsController < ApplicationController
  before_action :group, except: [:index, :create]
  def index
    @groups = current_user.groups
  end

  def show
    @comments = @group.comments
    @bills = @group.bills
  end

  def create
    # binding.pry
    @group = Group.new(group_params)
    if @group.save
      UserGroup.create({user_id: current_user.id, group_id: @group.id})
      render json: @group
    else
      redirect_to root_path
    end
  end

  def update
    if @group.update(group_params)
      render :group
    else
      render :edit
    end
  end

  def destroy
    if @group.destroy
      head :ok
    else
      redirect_to groups_path
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

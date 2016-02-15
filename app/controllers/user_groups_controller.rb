class UserGroupsController < ApplicationController
  def destroy
    @group = Group.find(params[:id])
  end
end

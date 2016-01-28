class RegistrationsController < Devise::RegistrationsController
  after_filter :add_personal


  private
  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
  end

  def add_personal
    if resource.persisted? # user is created successfuly
      group = Group.create(name: "#{resource.first_name} Personal", creator_id: resource.id )
      user_group = UserGroup.create(user_id: resource.id, group_id: group.id)

    end
  end

  def account_update_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
  end
end

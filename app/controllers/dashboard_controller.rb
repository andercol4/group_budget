class DashboardController < ApplicationController
  

  def index
    @groups = current_user.groups
    @upcoming_bills = current_user.upcoming_bills
   
  end


end

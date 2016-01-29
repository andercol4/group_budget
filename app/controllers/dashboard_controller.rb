class DashboardController < ApplicationController
  before_action :authenticate_user!, only: :index
  def index
    @groups = current_user.groups
    @upcoming_bills = current_user.upcoming_bills1
  end
  def landing
    if user_signed_in?
      redirect_to dashboard_path
    end
  end
  def faq
  end
  def about
  end

end

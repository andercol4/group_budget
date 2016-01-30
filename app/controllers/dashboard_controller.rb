class DashboardController < ApplicationController
  before_action :authenticate_user!, only: :index
  def index
    @groups = current_user.groups
    @upcoming_bills = current_user.upcoming_bills1
    @group_chart_data =[]
     current_user.groups.each do |group|

      @group_chart_data << { name: group.name, amount_owed: get_group(group) }

    end
    @group_chart_data
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
  private

  def get_group(group)
    user_bills = []
    total_amount = 0
    group.bills.each do |bill|
      user_bills << bill.user_bills.each do |bill|
        total_amount += bill.amount_owed if current_user.id == bill.user_id
      end
    end
    total_amount

  end
end

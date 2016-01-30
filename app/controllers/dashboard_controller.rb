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
    @bills_arrays = []
    15.times do |i|
      @bills_arrays << current_user.bills.where(due_date: i.days.from_now)
    end
    @date_array = []
    @bills_arrays.each_with_index do |arr, i|
      if arr.any?
        @date_array << {date: i.days.from_now.strftime('%a %d'), amount_owed: get_bill(arr)}
      else
        @date_array << {date: i.days.from_now.strftime('%a %d'), amount_owed: 0}
      end
    end

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

  def get_bill(arr)
    day_total = 0
    if arr.any?
      arr.each do |bill|
        bill.user_bills.each do |ub|
          if current_user.id == ub.user_id
            day_total += ub.amount_owed
          end
        end
      end
    end
    day_total
  end

  def get_group(group)
    user_bills = []
    total_amount = 0
    group.bills.each do |bill|
      if bill.due_date < 1.month.from_now
        user_bills << bill.user_bills.each do |bill|
          total_amount += bill.amount_owed if current_user.id == bill.user_id
        end
      end
    end
    total_amount

  end
end

class BillsController < ApplicationController
  before_action :authenticate_user!
  before_action :bill,  only: [:show, :update, :destroy]

  def index
    @group = Group.find(params[:group_id])
    @bills= @group.bills_breakdown
    # binding.pry
    render json: @bills
  end

  def show
  end

  def create
    @group = Group.find(params[:group_id])
    @bill = @group.bills.new(bill_params)
    @bill.creator_id = current_user.id
    if @bill.save
      @user_bills = @bill.divide_bill
      @user = User.find(@bill.creator_id)
      @user_bills.each do |ub|
        next unless ub.user_id == current_user.id
        @user_bill = ub
      end
      render :bill
    else
      'SEND USER ERROR MESSAGE'
    end
  end

  def update
    if @bill.update(bill_params)
      render json: :bill
    else
      'SEND USER ERROR MESSAGE'
    end
  end

  def destroy
    if @bill.destroy
      head :ok
    else
      "'SEND USER ERROR MESSAGE'"
    end
  end

  private

  def bill
    @bill = Bill.find(params[:id])
  end

  def bill_params
    params.require(:bill)
    .permit(:due_date, :is_paid, :recurring, :name, :group_id,:amount_id,:amount_total)
  end
end

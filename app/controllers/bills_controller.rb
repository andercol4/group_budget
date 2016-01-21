class BillsController < ApplicationController
  before_action :bill,  only: [:show, :update, :destroy]
  
  def index
    @bills = current_user.bills
  end

  def show
  end

  def create
    @bill = Bill.new(bill_params)
    if @bill.save?
      render json: :bill
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
    .permit(:due_date, :is_paid, recurring:, :name, :group_id,:amount_id,:amount_total)
  end
end

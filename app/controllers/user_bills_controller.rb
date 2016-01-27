class UserBillsController < ApplicationController
  def pay_bill
    @user_bill = UserBill.find_by(bill_id: params[:id], user_id: current_user.id)
    @bill = Bill.find(params[:id])
    if @user_bill
      @user_bill.amount_paid += params[:user_bill][:amount_paid].to_f
      @user_bill.amount_owed -= params[:user_bill][:amount_paid].to_f
      if @user_bill.amount_owed <= 0.01
        @user_bill.is_paid = true
      end
      @bill.amount_paid += params[:user_bill][:amount_paid].to_f
      if  @bill.amount_paid >= @bill.amount_total - 0.02
        @bill.is_paid = true
      end
      @bill.save
      @user_bill.save
      render json: {user_bill: @user_bill, bill: @bill}
    else
        #inform user that there is nothing to be paid
    end
  end
  private
  def user_bill_params
    params.require(:user_bill).permit(:amount_owed, :amount_paid, :is_paid)
  end
end

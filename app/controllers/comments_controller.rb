class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_comment, only: [:update, :destroy]

  def index
    @group = Group.find(params[:group_id])
    @comments = @group.comments
    render json: @comments
  end

  def create
    @group = Group.find(params[:group_id])
    @comment = @group.comments.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    @comment.destroy
    head :ok
  end

  private
    def comment_params
      params.require(:comment).permit(:body)
    end

    def find_comment
      @comment = Comment.find(params[:id])
    end
end

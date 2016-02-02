class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_comment, only: [:update, :destroy]

  def index
    @group = Group.find(params[:group_id])
    @comments = @group.comments.map do |comment|
      {id: comment.id, body: comment.body, first_name: User.find(comment.user_id).first_name}
    end
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

# not doing an edit comment
  # def update
  #   if @comment.update(comment_params)
  #     render json: @comment
  #   else
  #     render json: @comment.errors.full_messages
  #   end
  # end

# not doing a delete comment
  # def destroy
  #   @comment.destroy
  #   head :ok
  # end

  private
    def comment_params
      params.require(:comment).permit(:body)
    end
    
# only needed for the update and destroy methods
    # def find_comment
    #   @comment = Comment.find(params[:id])
    # end
end

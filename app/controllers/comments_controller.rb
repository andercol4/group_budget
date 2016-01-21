class CommentsController < ApplicationController
  before_action :find_comment, only: [:update, :destroy]

  def index
    @comments = #whatever
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :comment # need to build a jbuilder for this
    else
      render :new # do we have a new? no 
    end
  end

  def update
    if @comment.update(comment_params)
      render :comment # need to build a jbuilder for this
    else
      render :edit # also dont have an edit
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

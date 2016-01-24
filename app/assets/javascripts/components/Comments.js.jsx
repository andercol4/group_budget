class Comments extends React.Component {
  constructor(props){
    super(props);
    this.toggleAddComment = this.toggleAddComment.bind(this);
    this.showAddComment = this.showAddComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.state = {comments: this.props.comments, showForm: false}
  }
  toggleAddComment(){
    this.setState({showForm: !this.state.showForm})
  }
  showAddComment(){
    if(this.state.showForm)
      return(<div>
              <form onSubmit={this.addComment}>
                <input type="textarea" ref="addComment" placeholder="Comment here"/>
                <button type="submit">Submit</button>
              </form>
            </div>);
  }
  addComment(e){
    e.preventDefault();
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: {comment: {body: this.refs.addComment.value}, group_id: this.props.groupId}
    }).success( data => {
      comments = this.state.comments
      comments.push(data)
      this.refs.addComment.value = ""
      this.setState({comments, showForm: false})
    });
  }
  deleteComment(id){
    $.ajax({
      url: `/comments/${id}`,
      type: 'DELETE'
    }).success( data => {
      debugger
      this.props.refreshComments();
    });
  }
  render(){
    let comments = this.state.comments.map( comment => {
      return(<Comment key={`comment-${comment.id}`} deleteComment={this.deleteComment} {...comment} />)
    });
    return(<div>
            <button onClick={this.toggleAddComment}>Add Comment</button>
            {this.showAddComment()}
            {comments}
          </div>);
  }
}

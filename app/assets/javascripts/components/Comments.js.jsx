class Comments extends React.Component {
  constructor(props){
    super(props);
    this.toggleAddComment = this.toggleAddComment.bind(this);
    this.showAddComment = this.showAddComment.bind(this);
    this.addComment = this.addComment.bind(this);
    // this.deleteComment = this.deleteComment.bind(this);
    this.state = {comments: this.props.comments, showForm: false}

  }
  toggleAddComment(){
    this.setState({showForm: !this.state.showForm})
  }
  showAddComment(){
    if(this.state.showForm)
      return(<div>
              <form onSubmit={this.addComment}>

                <textarea autoFocus='true' className='comments-textarea'type="textarea" ref="addComment" placeholder="Add comment"/>
                <button className='link btn btn-default' type="submit">Submit</button>
                <button className='link btn btn-default' onClick='this.toggleAddComment'>Cancel</button>

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
      this.props.refreshComments()
      this.setState({showForm: false})
    });
  }
  // deleteComment(id){
  //   $.ajax({
  //     url: `/comments/${id}`,
  //     type: 'DELETE'
  //   }).success( data => {
  //     this.props.refreshComments();
  //   });
  // }
  render(){

    let comments = this.props.comments.map( comment => {
      return(<Comment key={`comment-${comment.id}`} {...comment} />)
    });
    return(<div>
        <div className='submit-btn link'onClick={this.toggleAddComment}>Add message</div>
            {this.showAddComment()}
        <div className='inner-comment-container'>    
            {comments}
        </div>
        </div>);
  }
}

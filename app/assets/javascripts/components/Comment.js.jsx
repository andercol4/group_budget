class Comment extends React.Component {
  constructor(props){
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.showEditComment = this.showEditComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.state = {showEdit: false, body: this.props.body}
  }
  toggleEdit(){
    this.setState({showEdit: !this.state.showEdit})
  }
  showEditComment(){
    if(this.state.showEdit)
      return(<div>
              <form onSubmit={this.editComment}>
                <input type="textarea" ref="editComment" defaultValue={this.props.body} />
                <button type="submit">Submit</button>
              </form>
            </div>);
  }
  editComment(e){
    e.preventDefault();
    $.ajax({
      url: `/comments/${this.props.id}`,
      type: 'PUT',
      data: {comment: {body: this.refs.editComment.value}}
    }).success( data => {
      let body = data.body
      this.setState({body, showEdit: false})
    });
  }
  render(){
    return(<div>
            <p>{this.state.body}</p>
            <button onClick={this.toggleEdit}>Edit</button>
            <button onClick={this.props.deleteComment.bind(this, this.props.id)}>Delete</button>
            {this.showEditComment()}
          </div>);
  }
}

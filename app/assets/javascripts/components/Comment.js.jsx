class Comment extends React.Component {
  constructor(props){
    super(props);
    // this.toggleEdit = this.toggleEdit.bind(this);
    // this.showEditComment = this.showEditComment.bind(this);
    // this.editComment = this.editComment.bind(this);
    this.state = {showEdit: false, body: this.props.body}
  }
  // toggleEdit(){
  //   this.setState({showEdit: !this.state.showEdit})
  // }
  // showEditComment(){
  //   if(this.state.showEdit)
  //     return(<div>
  //             <form onSubmit={this.editComment}>
  //               <input type="textarea" ref="editComment" defaultValue={this.props.body} />
  //               <button type="submit">Submit</button>
  //             </form>
  //           </div>);
  // }
  // editComment(e){
  //   e.preventDefault();
  //   $.ajax({
  //     url: `/comments/${this.props.id}`,
  //     type: 'PUT',
  //     data: {comment: {body: this.refs.editComment.value}}
  //   }).success( data => {
  //     let body = data.body
  //     this.setState({body, showEdit: false})
  //   });
  // }
  render(){
    return(<div>
            <p className='comment-text'>
              <span className='comments-username'>{this.props.first_name}:</span> {this.state.body}&nbsp;
            </p>
          </div>);
  }
}

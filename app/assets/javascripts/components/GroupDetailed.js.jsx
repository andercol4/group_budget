class GroupDetailed extends React.Component {
  constructor(props){
    super(props);
    this.inviteToggle = this.inviteToggle.bind(this)
    this.inviteForm = this.inviteForm.bind(this)
    this.submitInvite = this.submitInvite.bind(this)
    this.state = {group: this.props.group, comments: this.props.comments, bills: this.props.bills}
  }
  inviteToggle(){
    this.setState({inviteToggle: !this.state.inviteToggle})
  }
  inviteForm(){
    if(this.state.inviteToggle){
      return(
        <div>
          <form onSubmit={this.submitInvite}>
            <input type="email" ref="inviteEmail" placeholder='example@email.com' />
            <button type='submit'>Send Invite</button>
          </form>
        </div>)
    }
  }
  submitInvite(e){
    e.preventDefault()
    $.ajax({
      url: `/groups/${this.state.group.id}/invite`,
      type: 'POST',
      data: {email: this.refs.inviteEmail.value}
    }).success( data => {
      alert('It worked')
    })
  }
  render(){
    return(
      <div className="container row">
        <div className="col-md-offset-9 col-md-3">
          <button onClick={this.inviteToggle}>Invite to group</button>
          {this.inviteForm()}
        </div>
        <div className="col-xs-12 col-md-8">
          <Bills bills={this.state.bills} />
        </div>
        <div className="col-xs-12 col-md-4">
          <Comments comments={this.state.comments} groupId={this.props.group.id} />
        </div>
      </div>);
  }
}

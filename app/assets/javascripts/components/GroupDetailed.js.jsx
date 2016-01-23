class GroupDetailed extends React.Component {
  constructor(props){
    super(props);
    this.toggleNameEdit = this.toggleNameEdit.bind(this)
    this.nameForm = this.nameForm.bind(this)
    this.submitName = this.submitName.bind(this)
    this.inviteToggle = this.inviteToggle.bind(this)
    this.inviteForm = this.inviteForm.bind(this)
    this.submitInvite = this.submitInvite.bind(this)
    this.state = {group: this.props.group, comments: this.props.comments, bills: this.props.bills, name: this.props.group.name}
  }
  toggleNameEdit(){
    this.setState({nameEdit: !this.state.nameEdit})
  }
  nameForm(){
    if(this.state.nameEdit){
      return(
        <div>
          <form onSubmit={this.submitName}>
            <input type='text' ref='nameEdit' defaultValue={this.state.name} />
            <button className='btn btn-default' type='submit'>Change</button>
          </form>
        </div>
      )
    }
  }
  submitName(e){
    e.preventDefault()
    $.ajax({
      url: `/groups/${this.props.group.id}`,
      type: 'PUT',
      data: {group: {name: this.refs.nameEdit.value}}
    }).success( data => {
      let name = data.name
      this.setState({name, nameEdit: false})
    })
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
      <div className="row">
        <div className="text-center">
          <h1>{this.state.name}</h1>
          <button onClick={this.toggleNameEdit}>Edit Group Name</button>
          {this.nameForm()}
        </div>
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

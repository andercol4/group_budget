class GroupDetailed extends React.Component {
  constructor(props){
    super(props);
    this.refreshComments = this.refreshComments.bind(this);
    this.refreshBills = this.refreshBills.bind(this);
    this.toggleNameEdit = this.toggleNameEdit.bind(this);
    this.nameForm = this.nameForm.bind(this);
    this.submitName = this.submitName.bind(this);
    this.inviteToggle = this.inviteToggle.bind(this);
    this.inviteForm = this.inviteForm.bind(this);
    this.submitInvite = this.submitInvite.bind(this);
    this.toggleBillForm = this.toggleBillForm.bind(this);
    this.billForm = this.billForm.bind(this);
    this.submitBill = this.submitBill.bind(this);
    this.getComments = this.getComments.bind(this)
    this.state = {group: this.props.group, comments: this.props.comments, bills: this.props.bills, name: this.props.group.name, billForm: false}
  }
  refreshComments(){
    let self = this;
    $.ajax({
      url: '/comments',
      type: 'GET',
      data: {group_id: this.props.group.id}
    }).success( data => {
     
      self.setState({comments: data});
     
    })
  }
  refreshBills(){
    $.ajax({
      url: '/bills',
      type: 'GET'
    }).success( data => {
      this.setState({bills})
    })
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
      this.setState({inviteToggle: false})
      // TODO: let them know it was sent
    })
  }
  toggleBillForm(){
    this.setState({billForm: !this.state.billForm})
  }
  billForm(){
    if(this.state.billForm){
      return(
        <div>
          <form onSubmit={this.submitBill}>
            <input type='text' ref='billName' placeholder='Name' />
            <input type='number' step='any' ref='billAmount' placeholder='Amount' />
            <input type='date' ref='billDueDate' placeholder='Due Date' />
            <button type='submit'>Make Bill</button>
          </form>
        </div>)
    }
  }
  submitBill(e){
    e.preventDefault()
    $.ajax({
      url: '/bills',
      type: 'POST',
      data: {group_id: this.props.group.id,
              bill: {
                name: this.refs.billName.value,
                amount_total: this.refs.billAmount.value,
                due_date: this.refs.billDueDate.value
              }
            }
    }).success( data => {

      let bills = this.state.bills
      bills = bills.push(data.bill);
      // bills.sort(function(a,b){return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()})
      this.setState({bills})
    })
  }
  getComments(){
 
    return( <Comments comments={this.state.comments} 
                      groupId={this.props.group.id} 
                      refreshComments={ this.refreshComments} />) 
  }
  deleteGroup(id){

    $.ajax({
      url: '/groups/'+id,
      type: 'DELETE',

    }).success( data=> {
      this.props.refreshGroups();
    });

  }
  render(){
    
    return(

      <div>
        <button onClick={()=>this.deleteGroup(this.props.group.id)}>Delete</button> 
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
            <button onClick={this.toggleBillForm}>New Bill</button>
            {this.billForm()}
            <Bills bills={this.state.bills} refreshBills={this.refreshBills} />
          </div>
          <div className="col-xs-12 col-md-4">
            {this.getComments()}
          </div>
        </div>
      </div>);
  }
}

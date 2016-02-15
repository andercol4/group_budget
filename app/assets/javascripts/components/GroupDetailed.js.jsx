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
    this.getComments = this.getComments.bind(this);
    this.editName = this.editName.bind(this);
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
    let self = this;
    $.ajax({
      url: '/bills',
      type: 'GET',
      data: {group_id: this.props.group.id}
    }).success( data => {
      self.setState({bills: data})
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
            <input type='text' className='input-lg' ref='nameEdit' defaultValue={this.state.name} />
            <br />
            <button className='btn btn-default' type='submit'>Change</button>
            <button className='btn btn-default'onClick={this.toggleNameEdit}>Cancel</button>
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
            <input className='input-lg' type="email" ref="inviteEmail" placeholder='example@email.com' />
            <br/>
            <button type='submit' className='btn btn-default'>Send Invite</button>
            <button onClick={this.inviteToggle} className='btn btn-default'>Cancel</button>
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

      if(data.error === undefined){
        this.setState({inviteToggle: false});
      } else {
        alert(data.error)
      }

      // TODO: let them know it was sent
    }).error( data =>{

    })
  }
  toggleBillForm(){
    this.setState({billForm: !this.state.billForm})
  }
  billForm(){
    if(this.state.billForm){
      return(
        <div className='bill-container'>
          <form onSubmit={this.submitBill} className='form billForm'>
            <label>Name</label>
            <div className = 'form-group'>
              <input type='text' ref='billName' placeholder='Name'
                className="form-control input-lg" maxLength='16' required/>
            </div>
            <label>Amount</label>

            <div className = 'form-group'>
              <input type='number' step='any' ref='billAmount' placeholder='Amount'
                 className="form-control input-lg" min={1} max={999999} required/>
            </div>
            <div>
               <label>Due date</label>
              <input type='date' ref='billDueDate' placeholder='Due Date'
                  className="form-control input-lg" required/>
            </div>

            <div className = 'form-group'>
            <label>Recurring</label>
             <input type="checkbox" ref="billRecurring" className='form-control'></input>
            </div>
            <button type='submit' className='btn btn-default'>Add</button>
            <button onClick={this.toggleBillForm} className='btn btn-default'>Cancel</button>
          </form>
        </div>)
    }
  }
  submitBill(e){
    let recurring = this.refs.billRecurring.checked;
    e.preventDefault()
    $.ajax({
      url: '/bills',
      type: 'POST',
      data: {group_id: this.props.group.id,
              bill: {
                name: this.refs.billName.value,
                amount_total: this.refs.billAmount.value,
                due_date: this.refs.billDueDate.value,
                recurring: recurring
              }
            }
    }).success( data => {
      // let bills = this.state.bills
      // bills = bills.push(data.bill);
      // bills.sort(function(a,b){return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()})
      this.toggleBillForm();
      this.refreshBills();
    })
  }
  getComments(){
    return( <Comments comments={this.state.comments}
                      groupId={this.props.group.id}
                      refreshComments={ this.refreshComments}  />)
  }
  deleteGroup(id){
    var self = this
    if(confirm("Are you sure you want to delete this group? It will delete all the bills in this group!")){
      $.ajax({
        url: '/groups_redirect/'+id,
        type: 'DELETE',
      }).success( data => {
        // nothing here
      });
    }
  }
  editName(){

    if( this.props.group.creator_id === this.props.currentUser)
      return (<span onClick={this.toggleNameEdit} className='glyphicon glyphicon-pencil small link1'></span>)
  }
  render(){
    return(
      <div>
        <div className="row">
          <div className="text-center group-head">
            <h1>{this.state.name}
            &nbsp;{this.editName()}
            </h1>
            {this.nameForm()}
          </div>
          <div className="text-center col-md-offset-4 col-md-4">
            <div className=''>
              <h3 className='link submit-btn-center' onClick={this.inviteToggle}>
                <span className='glyphicon glyphicon-triangle-bottom'></span>Add user to group
              </h3>
            </div>
            {this.inviteForm()}
          </div>
          <div className ='col-md-6 col-xs-12 containers'>
          <div className='header'>Bills</div>
            <div className='submit-btn link' onClick={this.toggleBillForm}>Add Bill</div>
            {this.billForm()}
            <Bills bills={this.state.bills} refreshBills={this.refreshBills}
                  dashboard={this.props.dashboard} currentUser={this.props.currentUser}/>
          </div>
          <div className="col-xs-12 col-md-6 comments-container">
            <div className='header'>Message Board</div>
            {this.getComments()}
          </div>
        </div>
      </div>);
  }
}

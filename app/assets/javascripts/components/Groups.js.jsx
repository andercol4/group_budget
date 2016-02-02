class Groups extends React.Component{
  constructor(props){
    super(props);
    this.toggleGroupForm = this.toggleGroupForm.bind(this);
    this.groupForm = this.groupForm.bind(this);
    this.submitNewGroup = this.submitNewGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.state = {groups: this.props.groups, groupForm: false, formHint: '+ Add Group'}
  }
  toggleGroupForm(){
    this.setState({groupForm: !this.state.groupForm})
  }
  groupForm(){
    if(this.state.groupForm){
      this.state.formHint = '+ Add Group';
      return(
        <div>
          <form  onSubmit={this.submitNewGroup}>
            <div className="form-group group-container">
              <label>group name</label>
              <input type='text' maxLength='20' ref='groupName' placeholder='Group Name' 
                    autoFocus='true' required></input>
              <button className='btn btn-default'type='submit'>Add Group</button>
              <div className='btn btn-default'onClick={this.toggleGroupForm}>cancel</div>
            </div>

          </form>
        </div>);
    } else {
      this.state.formHint = 'Cancel';
    }
  }
  submitNewGroup(e){
    // debugger
    let self = this;
    e.preventDefault()
    $.ajax({
      url: '/groups',
      type: 'POST',
      data: {group: {name: this.refs.groupName.value}}
    }).success(data => {
      let groups = self.state.groups
      groups.unshift(data)
      self.toggleGroupForm();
      self.state.formHint = '+ Add Group';
      self.props.refreshGroups();
    }).error( data => {

    });
  }
  deleteGroup(id){
    if(confirm("Are you sure you want to delete this group? It will delete all the bills in this group!")){
      $.ajax({
        url: '/groups/'+id,
        type: 'DELETE',
      }).success( data=> {
        this.state.formHint = '+ Add Group';
        this.props.refreshGroups();
      });
    }
  }
  render(){

    let groups = this.props.groups.map(group => {
      return(<GroupSimple key = {`group-${group.id}`} {...group}
                          deleteGroup={this.deleteGroup} currentUser={this.props.currentUser} />)
    })
    return(
      <div>
        <div className='submit-btn' onClick={this.toggleGroupForm}>+ Group</div>
        {this.groupForm()}
        {groups}
      </div>)
  }

}

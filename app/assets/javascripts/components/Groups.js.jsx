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
    console.log('df')
    if(this.state.groupForm){
      this.state.formHint = '+ Add Group';
      return(
        <div>
          <form  onSubmit={this.submitNewGroup}>
            <div className="form-group group-container">
        
              <input type='text' ref='groupName' placeholder='Group Name'></input>
              <button type='submit'>Submit</button>
            </div>
            
          </form>
        </div>);
    } else {
      this.state.formHint = 'Cancel';
    }
  }
  submitNewGroup(e){
    // debugger
    e.preventDefault()
    $.ajax({
      url: '/groups',
      type: 'POST',
      data: {group: {name: this.refs.groupName.value}}
    }).success(data => {
      let groups = this.state.groups
      groups.unshift(data)
      this.toggleGroupForm();
      this.state.formHint = '+ Add Group';
    
      this.setState({groups})
    }).error( data => {
   
    });
  }
  deleteGroup(id){

    $.ajax({
      url: '/groups/'+id,
      type: 'DELETE',

    }).success( data=> {
      this.state.formHint = '+ Add Group';
      this.props.refreshGroups();
    });

  }
  render(){
   
    let groups = this.props.groups.map(group => {
      return(<GroupSimple key = {`group-${group.id}`} {...group}
                          deleteGroup={this.deleteGroup} />)
    })
    return(
      <div className='col-md-6 col-xs-12 containers'>
        <div className='new-group' onClick={this.toggleGroupForm}>{this.state.formHint}</div>
        {this.groupForm()}
        {groups}
      </div>)
  }

}

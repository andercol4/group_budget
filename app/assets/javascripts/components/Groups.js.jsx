class Groups extends React.Component{
  constructor(props){
    super(props);
    this.toggleGroupForm = this.toggleGroupForm.bind(this);
    this.groupForm = this.groupForm.bind(this);
    this.submitNewGroup = this.submitNewGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.state = {groups: this.props.groups, groupForm: false}
  }
  toggleGroupForm(){
    this.setState({groupForm: !this.state.groupForm})
  }
  groupForm(){
    if(this.state.groupForm){
      // debugger
      return(
        <div>
          <form  onSubmit={this.submitNewGroup}>
            <div className="form-group">
              <label>Group Name</label>
              <input type='text' ref='groupName' placeholder='Group Name'></input>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>);
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
      groups.push(data)
      this.setState({groups})
    }).error( data => {
    });
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
    let groups = this.props.groups.map(group => {
      return(<GroupSimple key = {`group-${group.id}`} {...group} 
                          deleteGroup={this.deleteGroup} />)
    })
    return(
      <div>
        <button onClick={this.toggleGroupForm}>New Group</button>
        {this.groupForm()}
        {groups}
      </div>)
  }

}

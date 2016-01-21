class Groups extends React.Component{
  constructor(props){
    super(props);
    this.state = {groups: this.props.groups}
  }
  render(){
    let groups = this.state.groups.map(group => {
      return(<GroupSimple key = {`group-${group.id}`} {...group} />)
    })
    return(
      <div>
      {groups}
      </div>)
  }

}
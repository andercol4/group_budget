class GroupSimple extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="group-container">
        <div>
          <a href={`/groups/${this.props.id}`}>
            <h1>{this.props.name}</h1>

          </a>
          <button onClick={()=>this.props.deleteGroup(this.props.id)}>Delete</button> 
        </div>
      </div>);
  }
}

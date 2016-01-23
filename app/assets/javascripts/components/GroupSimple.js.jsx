class GroupSimple extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <div>
          <a href={`/groups/${this.props.id}`}>
            <h1>{this.props.name}</h1>
          </a>
        </div>
      </div>);
  }
}

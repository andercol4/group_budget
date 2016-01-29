class GroupSimple extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <a href={`/groups/${this.props.id}`}>
        <div className="group-container">
          <div>
            <span className='fixed-up-right glyphicon glyphicon-remove-circle' 
              onClick={()=>this.props.deleteGroup(this.props.id)}>
            </span>
            <h1 className='text-center'>{this.props.name}</h1>
          </div>
        </div>
      </a>);
  }
}

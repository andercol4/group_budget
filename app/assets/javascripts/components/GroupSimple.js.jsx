class GroupSimple extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      
        <div className="group-container">
          <div>
            <span className='fixed-up-right glyphicon glyphicon-remove-circle' 
              onClick={()=>this.props.deleteGroup(this.props.id)}>
            </span>
            <a href={`/groups/${this.props.id}`}>
            <h1 className='text-center'>{this.props.name}</h1>
            </a>
          </div>
        </div>
      );
  }
}

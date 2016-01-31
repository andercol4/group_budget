class GroupSimple extends React.Component{
  constructor(props){
    super(props);
    this.deleteGroupButton = this.deleteGroupButton.bind(this);
  }
  deleteGroupButton(){
    if(this.props.currentUser == this.props.creator_id){
      return(<span className='fixed-up-right glyphicon glyphicon-remove-circle'
                   onClick={()=>this.props.deleteGroup(this.props.id)}>
             </span>);
    }
  }
  render(){
    return(
        <div className="group-container">
          <div>
            {this.deleteGroupButton()}
            <a href={`/groups/${this.props.id}`}>
            <h1 className='text-center'>{this.props.name}</h1>
            </a>
          </div>
        </div>
      );
  }
}

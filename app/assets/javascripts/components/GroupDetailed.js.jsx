class GroupDetailed extends React.Component {
  constructor(props){
    super(props);
    this.state = {group: this.props.group, comments: this.props.comments, bills: this.props.bills}
  }
  render(){
    debugger
    return(<div className="container row">
            <div className="col-xs-12 col-md-8">
              <Bills bills={this.state.bills} />
            </div>
            <div className="col-xs-12 col-md-4">
              <Comments comments={this.state.comments} groupId={this.props.group.id} />
            </div>
          </div>);
  }
}

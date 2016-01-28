class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.views = this.views.bind(this);
    this.upcomingView = this.upcomingView.bind(this);
    this.groupView = this.groupView.bind(this);
    this.refreshGroups = this.refreshGroups.bind(this)
    this.state = {groups: this.props.groups, bills: this.props.upcoming, views: "Groups"}
  }
  upcomingView(){
    this.setState({views: "Upcoming"});
  }
  groupView(){
    this.setState({views: "Groups"});
  }
  refreshGroups(){
    $.ajax({
      url: '/groups',
      type: 'GET',

    }).success( data => {
      this.setState( {groups: data} );
    })

  }

  views(){
    if(this.state.views == "Groups"){
      return(<Groups groups={this.state.groups} refreshGroups={this.refreshGroups} />)
    }else if(this.state.views == "Upcoming"){
      return(<Bills bills={this.state.bills} dashboard={this.props.dashboard} currentUser={this.props.currentUser} />)
    }else{}
  }
  render(){

    return(
      <div>
      <button onClick = {this.upcomingView}>upcoming bills</button>
      <button onClick = {this.groupView}>groups</button>
      {this.views()}


      </div>
    )
  }
}

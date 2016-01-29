class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.upcomingView = this.upcomingView.bind(this);
    this.groupView = this.groupView.bind(this);
    this.refreshGroups = this.refreshGroups.bind(this)
    this.refreshBills = this.refreshBills.bind(this)
    this.views = this.views.bind(this);
    this.state = {groups: this.props.groups, upcoming: this.props.upcoming, views: "Groups"}
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
  refreshBills(){
    let self = this;
    $.ajax({
      url: '/bills',
      type: 'GET',
      data: {group_id: this.props.group.id}
    }).success( data => {
      self.setState({bills: data})
    })
  }  

  views(){
    if(this.state.views == "Groups"){
      return(<Groups groups={this.state.groups} refreshGroups={this.refreshGroups} />)
    }else if(this.state.views == "Upcoming"){
      return(<Bills bills={this.state.upcoming} dashboard={this.props.dashboard} 
                          currentUser={this.props.currentUser} refreshBills={this.refreshBills} />)
    }else{}
  }
  render(){

    return(
      <div>
        <nav className='dashboard-nav'>
          <div className='dashboard-link' onClick = {this.upcomingView}>upcoming bills | </div>
          <div className='dashboard-link' onClick = {this.groupView}> &nbsp;groups</div>
        </nav>
        <div>
          {this.views()}
        </div>  
      </div>

    )
  }
}

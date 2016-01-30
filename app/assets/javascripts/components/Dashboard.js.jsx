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
    if(this.state.views !== "Groups")
      this.setState({views: "Groups"});
  }
  refreshGroups(){
    let self = this;
    $.ajax({
      url: '/groups',
      type: 'GET',

    }).success( data => {
      debugger
      self.setState( {groups: data} );
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
      return(<Groups groups={this.state.groups} refreshGroups={this.refreshGroups} />
              
              )
    }else if(this.state.views == "Upcoming"){
      return(
      <div className='col-md-6 col-xs-12'>
        <Bills bills={this.state.upcoming} dashboard={this.props.dashboard} 
                          currentUser={this.props.currentUser} refreshBills={this.refreshBills} />
      </div>)
    }else{}
  }
  canvas(){
     if(this.state.views == "Groups"){
      return(<GroupChart group_chart_data={this.props.group_chart_data}/>)
    }else if(this.state.views == "Upcoming"){
      return(<BillChart bill_chart_data={this.props.bill_chart_data}/>)
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
      
          <div className='col-md-6 col-xs-12 containers'>
              {this.canvas()}
          </div> 
        </div> 
      </div>

    )
  }
}

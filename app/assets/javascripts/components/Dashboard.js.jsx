class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.upcomingView = this.upcomingView.bind(this);
    this.groupView = this.groupView.bind(this);
    this.refreshGroups = this.refreshGroups.bind(this);
    this.refreshBills = this.refreshBills.bind(this);
    this.refreshChart = this.refreshChart.bind(this);
    this.refreshGroupChart = this.refreshGroupChart.bind(this);
    this.views = this.views.bind(this);
    this.state = {groups: this.props.groups, upcoming: this.props.upcoming, 
                  views: "Groups", groupChartData: this.props.groupChartData,
                  billChartData: this.props.billChartData,
                  chartTitle: 'Amount owed by group'}
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
      self.setState( {groups: data} );
      this.refreshChart()
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
  refreshChart(){
    let self = this;
    $.ajax({
      url:'charts',
      type: 'GET',
    }).success( data =>{
      self.setState({groupChartData: data.groupChartData})
      this.refreshGroupChart();
    })
  }
  refreshGroupChart(){
    if($("groupChart").length){
      this.chart.destroy();
    }
    let labels = []
    let data = []
    let loop = this.state.groupChartData.forEach(group => {
      labels.push(group.name)
      data.push(group.amount_owed)
    })
    data = {
    labels: labels,
    datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: data
        }
      ]
    };

  let ctx = document.getElementById("groupChart").getContext("2d");
  let myBarChart = new Chart(ctx).Bar(data, {responsive: true});    
  }

  views(){
    if(this.state.views == "Groups"){
      this.state.chartTitle = 'Amount owed in next 30 days split by group';
      return(<Groups groups={this.state.groups} refreshGroups={this.refreshGroups} 
                      currentUser={this.props.currentUser} />

              )
    }else if(this.state.views == "Upcoming"){
      this.state.chartTitle = 'Amount owed by day over 2 weeks';
      return(
      <div>
        <Bills bills={this.state.upcoming} dashboard={this.props.dashboard}
                          currentUser={this.props.currentUser} refreshBills={this.refreshBills} 
                          groups={this.props.groups}/>
      </div>)
    }else{}
  }
  canvas(){
     if(this.state.views == "Groups"){
      return(<GroupChart groupChartData={this.state.groupChartData}/>)
    }else if(this.state.views == "Upcoming"){
      return(<BillChart billChartData={this.state.billChartData}/>)
    }else{}
  }

  render(){
      let groupActive = this.state.views === 'Groups' ? 'actives':'';
      let billActive = this.state.views !== 'Groups' ? 'actives':'';

    return(
      <div>
        <div className='col-md-6 col-xs-12 containers'>
          <nav className='dashboard-nav '>
            <div className={`dashboard-link link ${billActive}`} onClick = {this.upcomingView}>upcoming bills  </div>
            <div className='dashboard-nolink'> &nbsp; | &nbsp;</div>

            <div className={`dashboard-link link ${groupActive}`} onClick = {this.groupView}> &nbsp;groups</div>
          </nav>
          {this.views()}
          </div>
        <div>
          

          <div className='col-md-6 col-xs-12 containers'>
              <header className ='chart-header dashboard-nolink'>{this.state.chartTitle}</header>
              {this.canvas()}
          </div>
        </div>
      </div>

    )
  }
}

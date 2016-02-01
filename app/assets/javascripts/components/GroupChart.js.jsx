class GroupChart extends React.Component{
	constructor(props){
		super(props)
		this.refreshChart = this.refreshChart.bind(this);
		this.state = {groupChartData: this.props.groupChartData}
	}
	refreshChart(){
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
	componentDidMount(){
		this.refreshChart();
	}

	componentWillUnmount(){
		if($("groupChart").length){
			this.chart.destroy();
		}
	}
	render(){

		return(<div>
						<canvas id='groupChart' />
					 </div>

					
		)

	}
}
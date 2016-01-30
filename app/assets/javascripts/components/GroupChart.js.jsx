class GroupChart extends React.Component{
	constructor(props){
		super(props)
		this.state = {group_chart_data: this.props.group_chart_data}
	}
	componentDidMount(){
		let labels = []
		let data = []
		let loop = this.state.group_chart_data.forEach(group => {
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
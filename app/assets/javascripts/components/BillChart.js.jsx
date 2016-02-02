class BillChart extends React.Component{
	constructor(props){
		super(props)
		this.state = {billChartData: this.props.billChartData}
	}
	componentDidMount(){
		let labels =[];
		let data = [];
		this.state.billChartData.forEach( bill => {
			labels.push(bill.date);
			data.push(bill.amount_owed.toFixed(2));
		});
		data = {
    labels: labels,
    datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(20,20,120,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(20,20,120,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: data
        }
      ]
    };

  let ctx = document.getElementById("billChart").getContext("2d");
	var myLineChart = new Chart(ctx).Line(data, {responsive:true});		

	}
	componentWillUnmount(){
		if($("billChart").length){
			this.chart.destroy();
		}
	}
	render(){
		return(<div>
						<canvas id='billChart' />
					 </div>)
	}
}
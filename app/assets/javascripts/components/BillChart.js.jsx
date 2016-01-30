class BillChart extends React.Component{
	constructor(props){
		super(props)
		this.state = {bill_chart_data: this.props.bill_chart_data}
	}
	componentDidMount(){
		let labels =[];
		let data = [];
		this.state.bill_chart_data.forEach( bill => {
			labels.push(bill.date);
			data.push(bill.amount_owed);
		});
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
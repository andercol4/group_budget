
$(function() {
	var data = {
    labels: ["Group1", "March", "April"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 35, 45]
        }
        // {
        //     label: "My Second dataset",
        //     fillColor: "rgba(151,187,205,0.5)",
        //     strokeColor: "rgba(151,187,205,0.8)",
        //     highlightFill: "rgba(151,187,205,0.75)",
        //     highlightStroke: "rgba(151,187,205,1)",
        //     data: [28]
        // },
        // {
        //     label: "My Second dataset",
        //     fillColor: "rgba(151,187,205,0.5)",
        //     strokeColor: "rgba(151,187,205,0.8)",
        //     highlightFill: "rgba(151,187,205,0.75)",
        //     highlightStroke: "rgba(151,187,205,1)",
        //     data: [28]
        // }
    ]
	};	
	var ctx = document.getElementById("groupChart").getContext("2d");
	var myBarChart = new Chart(ctx).Bar(data, {responsive: true});
});
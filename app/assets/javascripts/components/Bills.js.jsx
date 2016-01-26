class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBill = this.deleteBill.bind(this);
    this.state = {bills: this.props.bills}
  }
  deleteBill(id){
    $.ajax({
      url: '/bills/' + id,
      type: 'DELETE'
    }).success( data => {
      this.props.refreshBills();
    })
  }
  render(){
    let bills = this.props.bills.map( bill => {
      return(<BillSimple key={`bill-${bill.id}`} {...bill} deleteBill={this.deleteBill} dashboard={this.props.dashboard} />)
    });
    return(
      <div>
        {bills}
      </div>
    )
  }
}

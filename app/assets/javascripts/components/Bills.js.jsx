class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBill = this.deleteBill.bind(this);
    this.help = this.help.bind(this);
    this.state = {bills: this.props.bills}
  }
  deleteBill(id){
    if( confirm("Are you sure you want to delete this bill?") ){
      $.ajax({
        url: '/bills/' + id,
        type: 'DELETE'
      }).success( data => {
        this.props.refreshBills();
      })
    }
  }
  help(){
    debugger
  }
  render(){
    // debugger
    let bills = this.props.bills.map( bill => {
      return(<BillSimple key={`bill-${bill.id}`} {...bill} deleteBill={this.deleteBill} dashboard={this.props.dashboard} refreshBills={this.props.refreshBills} currentUser={this.props.currentUser}/>)
    });
    return(
      <div>
        <p onClick={this.help}>Help Me!</p>
        {bills}
      </div>
    )
  }
}

class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bills: this.props.bills}
  }
  render(){
    let bills = this.state.bills.map( bill => {
      return(<BillSimple key={`bill-${bill.id}`} {...bill} />)
    });
    return(
      <div>
        {bills}
      </div>
    )
  }
}

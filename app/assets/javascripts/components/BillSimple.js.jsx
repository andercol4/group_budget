class BillSimple extends React.Component {
  constructor(props) {
    super(props);
    this.payBillAuth = this.payBillAuth.bind(this);
    this.deleteBillAuth = this.deleteBillAuth.bind(this);
    this.togglePayBill = this.togglePayBill.bind(this);
    this.payBillForm = this.payBillForm.bind(this);
    this.payBill = this.payBill.bind(this);
    this.state = {showPay: false}
  }
  payBillAuth(){
    let ubBoolean = false;
    if (this.props.dashboard){
      ubBoolean = false;
      //pay bill is not working on dashboard so don't show the button
    } else {
      for(i = 0; i < this.props.user_bills.length; i++){
        if(this.props.user_bills[i].user_id === this.props.currentUser){
          ubBoolean = true
        }
      }
    }
    if(ubBoolean){
      return(<div onClick={this.togglePayBill}>Pay Bill</div>);
    }
  }
  deleteBillAuth(){
    if(this.props.currentUser === this.props.creator_id && !this.props.dashboard){
      return(<div onClick={() => this.props.deleteBill(this.props.id)}>Delete Bill</div>)
    } else if(this.props.dashboard) {
      return(<a href={`/groups/${this.props.group_id}`}>Goto group</a>)
    }
  }
  togglePayBill(){
    this.setState({showPay: !this.state.showPay})
  }
  payBillForm(){
      let ubOwed = 0;
    if(this.props.dashboard){
      ubOwed = Math.abs(this.props.amount_owed).toFixed(2)
    }else {
      for(i = 0; i < this.props.user_bills.length; i++){
        if(this.props.user_bills[i].user_id === this.props.currentUser){
          ubOwed = Math.abs(this.props.user_bills[i].amount_owed).toFixed(2)
        }
      }  
    }
    if(this.state.showPay)
      return(<div>
              <form onSubmit={this.payBill}>
                <input type="number" step="any" ref="amountPaid" min="0" max={ubOwed} defaultValue={ubOwed} />
                <button type="submit">Submit</button>
              </form>
            </div>);
  }
  payBill(e){
    let self = this
    e.preventDefault();
    $.ajax({
      url: `/bills_paid/${this.props.id}`,
      type: 'PUT',
      data: {user_bill: {amount_paid: this.refs.amountPaid.value}}
    }).success( data => {
      this.togglePayBill()
      this.props.refreshBills();
    })
  }
  render(){
      let billPaid = this.props.is_paid ? "paid":"not-paid";
      let billStyle ="panel panel-default bs col-sm-8 col-md-offset-2 col-xs-12 col-xs-offset-0";
      let panelHeading =billPaid+" panel-heading bs-name";
      let debtPaid = this.props.debt_paid ? "paid" : 'not-paid';
      let owedStyle = debtPaid + ' bs-amount-owed';
      let userBills = ''
      if(this.props.dashboard) {
        userBills = <span className={owedStyle}>
                      You owe:{(this.props.amount_owed.toFixed(2) )}
                    </span>
      } else {
        let ubs = this.props.user_bills.map(ub => {
          return(
            <div key={`ubs-${ub.ub_id}`}>
              <span>{ub.username} owes: ${Math.abs(ub.amount_owed).toFixed(2)}</span>
            </div>
          )
        })
        userBills = ubs
      }
    return(
      <div className='row'>
        <div className={billStyle}>
          <header className={panelHeading}>
            <h3 className="panel-title">
              <span className='left'>
                {this.props.name}
              </span>
              <span className='right bs-total-amount'>
                ${this.props.amount_total}
              </span>
            </h3>
          </header>
            <div className="panel-body">
             <span className='bs-due_date'>
               Due: {this.props.due_date}
             </span>
            <span className='bs-due_date'>
               Responsible: {this.props.first_name}
             </span>
            </div>
            {userBills}
            {this.payBillAuth()}
            {this.payBillForm()}
            {this.deleteBillAuth()}
        </div>
      </div>)
  }
}

class BillSimple extends React.Component {
  constructor(props) {
    super(props);
    this.togglePayBill = this.togglePayBill.bind(this);
    this.payBillForm = this.payBillForm.bind(this);
    this.payBill = this.payBill.bind(this);
    this.state = {showPay: false}
  }

  togglePayBill(){
    this.setState({showPay: !this.state.showPay})
  }
  payBillForm(){
    if(this.state.showPay)
      return(<div>
              <form onSubmit={this.payBill}>
                <input type="number" step="any" ref="amountPaid" min="0" max={this.props.amount_owed.toFixed(2)} defaultValue={this.props.amount_owed.toFixed(2)} />
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
              <span>{ub.username} owes: ${ub.amount_owed.toFixed(2)}</span>
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
                {userBills}
            </div>
            <div onClick={this.togglePayBill}>Pay Bill</div>
            {this.payBillForm()}
            <div onClick={() => this.props.deleteBill(this.props.id)}>Delete Bill</div>
        </div>
      </div>
    )
  }
}

class BillSimple extends React.Component {
  constructor(props) {
    super(props);
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
                      You owe:{(this.props.amount_owed.toFixed(2))}
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
            <div onClick={() => this.props.deleteBill(this.props.id)}>Delete Bill</div>
        </div>
      </div>
    )
  }
}

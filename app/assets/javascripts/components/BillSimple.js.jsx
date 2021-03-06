class BillSimple extends React.Component {
  constructor(props) {
    super(props);
    this.payBillAuth = this.payBillAuth.bind(this);
    this.deleteBillAuth = this.deleteBillAuth.bind(this);
    this.togglePayBill = this.togglePayBill.bind(this);
    this.payBillForm = this.payBillForm.bind(this);
    this.payBill = this.payBill.bind(this);
    this.groupName = this.groupName.bind(this);
    this.userOwes = this.userOwes.bind(this);
    this.detailedInfo = this.detailedInfo.bind(this);
    this.toggleDetailedView = this.toggleDetailedView.bind(this);
    this.paid = this.paid.bind(this);
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
          ubBoolean = true;
        }
      }
    }
    if(ubBoolean){
      return(<div className='billButton link'onClick={this.togglePayBill}>Pay</div>);
    }
  }
  deleteBillAuth(){
    if(this.props.currentUser === this.props.creator_id && !this.props.dashboard){
      return(<div className='billButton link' onClick={() => this.props.deleteBill(this.props.id)}>Delete</div>)
    } else if(this.props.dashboard) {
      return(<a className='billButton link' href={`/groups/${this.props.group_id}`}>{this.props.groupName}</a>)
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
                <button className='btn btn-default'type="submit">Submit</button>
                <div className='btn btn-default'onClick={this.togglePayBill}>Cancel</div>
              </form>
            </div>
            );
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
  // show group name if dashboard else it doesn't show
  groupName(){
    // if(this.props.dashboard){
    //   return( <div>Personal</div>)
    // }
  }
  //get the amount logged in users owes
  userOwes(){
    let amount_owed = 0;
    if(this.props.dashboard) {
        amount_owed = this.props.amount_owed.toFixed(2)
    } else {
      this.props.user_bills.forEach(ub => {
          if(ub.user_id === this.props.currentUser){
            amount_owed = Math.abs(ub.amount_owed).toFixed(2)
          }
        });
    }
    return amount_owed
  }
  //show detailed info if groupDetailed page and showDetailedView is true
  detailedInfo(){
    if(!this.props.dashboard && this.state.showDetailedView){
      let ubs = []
        this.props.user_bills.forEach(ub => {
          if(ub.user_id !== this.props.currentUser){
            ubs.push(
              <div key={`ubs-${ub.ub_id}`} className='user-amount'>
                <div className="user">{ub.username}:</div>
                <div className="user-owes">${Math.abs(ub.amount_owed).toFixed(2)}</div>
              </div>
            )
          }else{
             ubs.push(
              <div key={`ubs-${ub.ub_id}`} className='user-amount'>
               <div className="user">You owe:</div>
               <div className="user-owes">${Math.abs(ub.amount_owed).toFixed(2)}</div>
              </div>
            )

          }
        })
        userBills = ubs
    return(
      <div className ='user-bills'>
        <div className='user-amount'>
         Created by:
         <span className="user-owes">{this.props.first_name}</span>
        </div>
         {userBills}
      </div>)
    }


  }
  toggleDetailedView(){
    this.setState({showDetailedView: !this.state.showDetailedView});
  }
  //Only show toggle button if in group detailed view
  showDetailToggler(){
    if(!this.props.dashboard){
      return(<span className='glyphicon glyphicon-info-sign billButton link' onClick={this.toggleDetailedView}>
      </span> )
    }
  }
  formatDate(date){
     let d = new Date(date);
     d = new Date(d.getTime() + d.getTimezoneOffset()*60000);
     return d.toDateString().split(' ').slice(1,3).join(' ');
  }
  paid(){
    let dashboard = this.props.dashboard
    let ubPaid = false;
    if (dashboard){
    } else {
      for(i = 0; i < this.props.user_bills.length; i++){
        if(this.props.user_bills[i].user_id === this.props.currentUser){
          ubPaid = this.props.user_bills[i].is_paid;
        }
      }
    }
    if(ubPaid){
      return("PAID");
    } else {
      return(`$${this.userOwes()}`);
    }
  }
  render(){
      let billPaid = this.props.is_paid ? "paid":"not-paid";
      let billStyle ="panel panel-default bs col-sm-8 col-md-offset-2 col-xs-12 col-xs-offset-0";
      let panelHeading =billPaid+" panel-heading bs-name";
      let debtPaid = this.props.debt_paid ? "paid" : 'not-paid';
      let owedStyle = debtPaid + ' bs-amount-owed';
      let userBills = ''


    return(
        <div className="bill-container">
          <div className="bill-heading bs-name">
            <div className='title'>
              {this.props.name}
            </div>
            <div className='amount-due'>
              <span className='small-text'>you:</span> {this.paid()}
            </div>
          </div>
          <div className='amount-date'>
            <div className="due-date">
              <span className='small-text'>due:</span>  {this.formatDate(this.props.due_date)}
            </div>
            <div className="total-amount">
              <span className='small-text'>total:</span>  ${this.props.amount_total.toFixed(2)}
            </div>
          </div>
          <div className ='detailedInfo'>
             {this.detailedInfo()}
          </div>
          <div className='bill-info'>
            {this.groupName()}
            {this.payBillAuth()}
            {this.payBillForm()}
            {this.deleteBillAuth()}
            {this.showDetailToggler()}
          </div>
        </div>
      )
  }
}

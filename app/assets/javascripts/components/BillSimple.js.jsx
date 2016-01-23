class BillSimple extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
      let paid = this.props.is_paid ? "paid":"not-paid";
    return(
    
      <div className='row'>
        <div className='bs col-sm-8 col-md-offset-2 col-xs-12 col-xs-offset-0'>
           <header className='bs-name'>
             {this.props.name}
           </header>  
           <div className='bs-total-amount'>
             Total: {this.props.amount_total}
           </div>
          <div className='bs-amount-owed'>
             You owe:{this.props.amount_owed}
           </div>  
           <div className='bs-due_date'>
             Due: {this.props.due_date}
           </div> 
           <div className='bs-is-paid'>
             {this.props.is_paid.toString()}
           </div>  
        </div>
      </div>
    )
  }
}

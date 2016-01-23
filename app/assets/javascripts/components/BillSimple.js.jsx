class BillSimple extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
      let paid = this.props.is_paid ? "paid":"not-paid";
      let billStyle ="panel panel-default bs col-sm-8 col-md-offset-2 col-xs-12 col-xs-offset-0";
      let panelHeading =paid+" panel-heading bs-name";
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
              <span className='bs-amount-owed'>
               You owe:{this.props.amount_owed}
             </span>  
             <span className='bs-due_date'>
               Due: {this.props.due_date}
             </span> 
            </div>
     
        </div>
      </div>
    )
  }
}

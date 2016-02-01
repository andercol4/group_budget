class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBill = this.deleteBill.bind(this);
    this.help = this.help.bind(this);
    this.state = {bills: this.props.bills}
    this.getName = this.getName.bind(this);
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
    
  }
  getName(id){
    if(this.props.dashboard){
      let name = 'Goto group'
      this.props.groups.forEach( group =>{
        if(group.id === id ){
          name = group.name
        }
      });
      return name; 
    }
  }
  render(){
  
    let self = this;
    let bills = this.props.bills.map( bill => {


      return(<BillSimple key={`bill-${bill.id}`} 
              {...bill} 
              deleteBill={this.deleteBill} 
              dashboard={this.props.dashboard} 
              groupName={this.getName(bill.group_id)}
              refreshBills={this.props.refreshBills} 
              currentUser={this.props.currentUser}/>)
    });
    return(
      <div>
        {bills}
      </div>
    )
  }
}

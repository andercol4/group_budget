class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {groups: this.props.groups, bills: this.props.upcoming}
  }
  render(){
    return(
      <div>
        <Bills bills={this.state.bills} />
      </div>
    )
  }
}

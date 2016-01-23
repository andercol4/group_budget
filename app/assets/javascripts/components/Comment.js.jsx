class Comment extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(<div>
            {this.props.body}
          </div>);
  }
}

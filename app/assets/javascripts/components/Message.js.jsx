class Message extends React.Component{
	constructor(props){
		super(props);
		this.state = {message: this.props.message}
	}
	render(){
		debugger
		return(<div className='alert-box'>
							<div className='close-box' onClick={this.remove}>
								close
							</div>
							<p>message</p>
					 </div>)
	}
}
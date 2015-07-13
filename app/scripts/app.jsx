var body = document.body;

var App = React.createClass({

	mixins: [ReactFireMixin],
	componentWillMount: function () {
	    this.bindAsArray(new Firebase("https://critlink.firebaseio.com/crits/"), "crits");
	},

	componentDidMount: function () {
	    document.addEventListener('click', this._clickOut);  
	},

	componentWillUnmount: function () {
	    document.removeEventListener('click', this._clickOut);  
	},

	getInitialState: function () {
	    return {
	        crits: []
	    };
	},

	openCrit: function (e) {
		var self = this;
		this.setState({x: e.pageX});
		this.setState({y: e.pageY});
		// this.firebaseRefs["crits"].push({
		// 	text: this.state.text,
		// 	xPosition: this.state.x,
		// 	yPosition: this.state.y
		// });
		setTimeout(function () {
			self.refs.input.getDOMNode().focus();
		}, 1);
		console.log(this.state.text, e.pageX, e.pageY);
	},

	submitCrit: function(e) {
		
		if (this.state.text !== undefined) {
			e.preventDefault();
			this.setState({created: "true"});
			console.log(this.state.created);
			this.firebaseRefs["crits"].push({
				text: this.state.text,
				xPosition: this.state.x,
				yPosition: this.state.y
			});
		this.setState({text: undefined});
		}
		this._clickOut();
	},

	handleChange: function(event){
		this.setState({text: event.target.value});
	},

	_clickOut: function () {
		// TODO: hide pop up on click out
		this.setState({x: null});
	},

	_captureClicks: function (e) {
		e.nativeEvent.stopImmediatePropagation();
		e.stopPropagation();
	},

  	render: function() {
  		console.log(this.state.crits[0], Date.now());
    return (
    <div>
    	<div className="titlebox">
        	CRITlink
    	</div>
    	
    	<div id="image" onClick={this._captureClicks}>
    		<img src="http://static.tumblr.com/4a0e48e18cbd85da3092407c562a9a72/bnfotgl/COhn17d4j/tumblr_static_spiky_haired_guy_bg.png"
    		onClick={this.openCrit}/>
	    	{this.state.crits.map(function (crit, index) {
				return (
					<div className="comment" 
						key={index}
						style={{top: crit.yPosition, left: crit.xPosition, position: "absolute"}}>
						<p>{ crit.text }</p>
					</div>
				);
			})}		

	    	{this.state.x && <form id="popup" onSubmit={this.submitCrit} style={{top: this.state.y, left: this.state.x, position: "absolute"}}>
		    	<input name="text"
		    			placeholder="Enter your comment here!"
		    			id="comment-form"
		    			onChange={this.handleChange}
		    			ref="input"/>
				<button type="submit" id="btn">Submit</button>
			</form>}
    	</div>
    	
    </div>
    );
  }
});
React.render(
  <App />,
  document.body
);
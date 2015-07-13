var body = document.body;

var App = React.createClass({

	mixins: [ReactFireMixin],
	componentWillMount: function () {
	    this.bindAsArray(new Firebase("https://critlink.firebaseio.com/crits/"), "crits");
	},

	getInitialState: function () {
	    return {
	        crits: []  
	    };
	},

	openCrit: function (e) {
		this.setState({x: e.pageX});
		this.setState({y: e.pageY});
		// this.firebaseRefs["crits"].push({
		// 	text: this.state.text,
		// 	xPosition: this.state.x,
		// 	yPosition: this.state.y
		// });
		console.log(this.state.text, e.pageX, e.pageY);
	},

	submitCrit: function(e) {
		this.setState({created: "true"});
		if (this.state.text !== undefined) {
		this.firebaseRefs["crits"].push({
			text: this.state.text,
			xPosition: this.state.x,
			yPosition: this.state.y,
			created: this.state.created
		});
		this.setState({text: undefined});
		}
	},

	handleChange: function(event){
		this.setState({text: event.target.value});
	},

	_clickOut: function () {
		// TODO: hide pop up on click out
		this.setState({x: null});
	},

  	render: function() {
    return (
    <div>
    	<div className="titlebox">
        	CRITlink
    	</div>
    	
    	<div id="image">
    		<img src="http://static.tumblr.com/4a0e48e18cbd85da3092407c562a9a72/bnfotgl/COhn17d4j/tumblr_static_spiky_haired_guy_bg.png"
    		onClick={this.openCrit}/>

	    	{this.state.x && <div id="popup" style={{top: this.state.y, left: this.state.x, position: "absolute"}}>
	    	<input form="text"
	    			placeholder="Enter your comment here!"
	    			id="comment-form"
	    			onChange={this.handleChange}/>
	    			<button type="button" id="btn" onClick={this.submitCrit}>Submit</button>
	    			</div>}
	    	{this.state.created && <div id="comment"
	    								style={{top: this.state.y, left: this.state.x, position: "absolute"}}>
	    							<p>{this.state.text}</p>
	    							</div>}		
    	</div>
    	
    </div>
    );
  }
});
React.render(
  <App />,
  document.body
);


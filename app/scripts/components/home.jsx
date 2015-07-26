var React = require('react');

var Home = React.createClass({
	render: function(){
		return (
			<div>
				<div className="titlebox">
        			CRITlink
    			</div>

    			<input type="text" placeholder="Paste your image URL here.">
    			<button type="button"><Link to={"/#"}>Submit</Link></button>
    		</div>
		);
	}
});


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var body = document.body;

var App = React.createClass({
	displayName: "App",

	mixins: [ReactFireMixin],
	componentWillMount: function componentWillMount() {
		this.bindAsArray(new Firebase("https://critlink.firebaseio.com/crits/"), "crits");
	},

	componentDidMount: function componentDidMount() {
		document.addEventListener("click", this._clickOut);
	},

	componentWillUnmount: function componentWillUnmount() {
		document.removeEventListener("click", this._clickOut);
	},

	getInitialState: function getInitialState() {
		return {
			crits: []
		};
	},

	openCrit: function openCrit(e) {
		var self = this;
		this.setState({ x: e.pageX });
		this.setState({ y: e.pageY });
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

	submitCrit: function submitCrit(e) {

		if (this.state.text !== undefined) {
			e.preventDefault();
			this.setState({ created: "true" });
			console.log(this.state.created);
			this.firebaseRefs["crits"].push({
				text: this.state.text,
				xPosition: this.state.x,
				yPosition: this.state.y
			});
			this.setState({ text: undefined });
		}
		this._clickOut();
	},

	handleChange: function handleChange(event) {
		this.setState({ text: event.target.value });
	},

	_clickOut: function _clickOut() {
		// TODO: hide pop up on click out
		this.setState({ x: null });
	},

	_captureClicks: function _captureClicks(e) {
		e.nativeEvent.stopImmediatePropagation();
		e.stopPropagation();
	},

	render: function render() {
		console.log(this.state.crits[0], Date.now());
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "titlebox" },
				"CRITlink"
			),
			React.createElement(
				"div",
				{ id: "image", onClick: this._captureClicks },
				React.createElement("img", { src: "http://static.tumblr.com/4a0e48e18cbd85da3092407c562a9a72/bnfotgl/COhn17d4j/tumblr_static_spiky_haired_guy_bg.png",
					onClick: this.openCrit }),
				this.state.crits.map(function (crit, index) {
					return React.createElement(
						"div",
						{ className: "comment",
							key: index,
							style: { top: crit.yPosition, left: crit.xPosition, position: "absolute" } },
						React.createElement(
							"p",
							null,
							crit.text
						)
					);
				}),
				this.state.x && React.createElement(
					"form",
					{ id: "popup", onSubmit: this.submitCrit, style: { top: this.state.y, left: this.state.x, position: "absolute" } },
					React.createElement("input", { name: "text",
						placeholder: "Enter your comment here!",
						id: "comment-form",
						onChange: this.handleChange,
						ref: "input" }),
					React.createElement(
						"button",
						{ type: "submit", id: "btn" },
						"Submit"
					)
				)
			)
		);
	}
});
React.render(React.createElement(App, null), document.body);

},{}]},{},[1]);
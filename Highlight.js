import React, { Component } from "react";
import "../style/Highlight.css";

class Highlight extends Component {
	render() {
		const {
			position,
			onClick,
			onMouseOver,
			onMouseOut,
			comment,
			isScrolledTo
		} = this.props;
		const {
			rects,
			boundingRect
		} = position;
		//	appending opacity
		rects.map((rect) => rect.opacity = comment.classifier_score);

		return React.createElement("div", {
			className: `Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`
		}, comment ? React.createElement("div", {
			className: "Highlight__emoji",
			style: {
				left: 20,
				top: boundingRect.top
			}
		}, comment.emoji) : null, React.createElement("div", {
			className: "Highlight__parts"
		}, rects.map((rect, index) => React.createElement("div", {
			onMouseOver: onMouseOver,
			onMouseOut: onMouseOut,
			onClick: onClick,
			key: index,
			style: rect,
			className: `Highlight__part ${comment.text.replace(/\s/g, '')}`
		}))));
	}

}

export default Highlight;
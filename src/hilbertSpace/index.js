import React from 'react';

export const HilbertSpace = (props) => {
	let coins = [{ x: 0, y: 0 }]
	return (
		<div id="hilbertSpace">
			{coins.map((v, i) => <Coin key={`coin_${i}`} initialPos={v} index={i} />)}
		</div>
	)
}

class Coin extends React.Component {
	constructor(props) {
		super(props);
		console.log("Coin:", props.initialPos)

		this.coinRef = React.createRef();

		this.state = {
			x: props.initialPos.x,
			y: props.initialPos.y,
			dragging: false,
		}

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}


	componentDidUpdate(props, state) {
		console.log("componentDidUpdate:", this.state)
		if (this.state.dragging) {
			document.addEventListener('mousemove', this.onMouseMove)
			document.addEventListener('mouseup', this.onMouseUp)
		} else if (!this.state.dragging) {
			document.removeEventListener('mousemove', this.onMouseMove)
			document.removeEventListener('mouseup', this.onMouseUp)
		}
	}

	// calculate relative position to the mouse and set dragging=true
	onMouseDown(e) {
		// only left mouse button
		if (e.button !== 0) return
		console.log("onMouseDown:", e)
		this.setState({
			...this.state,
			dragging: true,
			x: e.pageX,
			y: e.pageY
		})
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseUp(e) {
		console.log("onMouseUp:", e)
		this.setState({
			...this.state,
			dragging: false
		})
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseMove(e) {
		if (!this.state.dragging) return
		console.log("onMouseMove:", e)
		this.setState({
			...this.state,
			x: e.pageX,
			y: e.pageY
		})
		e.stopPropagation()
		e.preventDefault()
	}



	render() {
		console.log("render:", this.state)

		return <span
			onMouseDown={this.onMouseDown}
			onMouseUp={this.onMouseUp}
			onMouseMove={this.onMouseMove}
			style={{ 
				left: this.state.x, 
				top: this.state.y, 
				position: 'fixed',
				cursor: 'pointer'
			}}>
			coin
		</span>
	}
}

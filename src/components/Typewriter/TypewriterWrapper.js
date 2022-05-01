import React from "react";

const FULL_TEXT = ['Hello,', 'I\'m Drew', 'Enjoy']

class TypewriterWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      enabled: false,
      cursorCharacter: '\xa0',
      typeText: '',
      curLine: 0,
      curIndex: 0
    }
  }

  handleClick = () => {
    this.setState((state) => ({
      enabled: !state.enabled
    }))
    this.handleCursorBlink()
    this.start()
  }

  handleCursorBlink = () => {
    setTimeout(() => {
      if(this.state.cursorCharacter === '|'){
        this.setState((state) => ({
          cursorCharacter: '\xa0'
        }), () => this.handleCursorBlink())
      } else{
        this.setState((state) => ({
          cursorCharacter: '|'
        }), () => this.handleCursorBlink())
      }
    }, 530)
  }

  drawLetter = () => {
    if(this.state.curLine >= FULL_TEXT.length) { return }

    setTimeout(() => {
      if (this.state.curIndex < FULL_TEXT[this.state.curLine].length) {
        this.setState((state) => ({
          typeText: FULL_TEXT[this.state.curLine].substring(0, this.state.curIndex + 1),
          curLine: state.curLine,
          curIndex: state.curIndex + 1
        }), () => this.drawLetter())
      } else {
        this.setState((state) => ({
          typeText: FULL_TEXT[this.state.curLine].substring(0, this.state.curIndex + 1),
          curLine: state.curLine + 1,
          curIndex: 0
        }), () => this.drawLetter())
      }
    }, ((Math.floor(Math.random() * 8) + 3) * 50))
  }

  start = () => {
    this.drawLetter()
  }

  render() {
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center bg-snow-blue">
        <h1 className="text-[18rem] text-center">
          {this.state.typeText + this.state.cursorCharacter}
        </h1>
        <button className="text-9xl" onClick={this.handleClick}>button</button>
      </div>
    )
  }
  
}

export default TypewriterWrapper
  
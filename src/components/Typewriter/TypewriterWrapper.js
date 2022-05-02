import React from "react"
import { sleep } from '../../logic/utils'

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
    }), () => this.start())
    
  }

  animateCursor = async() => {
    console.log(this.state.enabled)
    while (this.state.enabled) {
      this.setState((state) => ({
        cursorCharacter: state.cursorCharacter === '|' ? '\u00a0' : '|'
      }))
      
      await sleep(530)
    }
  }

  animateClearText = async() => {
    while (this.state.typeText.length > 0) {
      this.setState((state) => ({
        typeText: state.typeText.substring(0, state.typeText.length - 1),
      }))
      await sleep(230)
    }
  }

  animateDrawText = async(text) => {
    for(const c of text) {
      this.setState((state) => ({
        typeText: state.typeText + c,
      }))
      await sleep((Math.floor(Math.random() * 8) + 3) * 50)
    }
  }

  start = async() => {
    this.animateCursor()
    for(const line of FULL_TEXT) {
      await this.animateDrawText(line).then(() => sleep(1300))
      await this.animateClearText().then(() => sleep(350))
    }
  }

  render() {
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center bg-snow-blue">
        <h1 className="font-mono text-[18rem] text-center">
          {this.state.typeText + this.state.cursorCharacter}
        </h1>
        <button className="text-9xl" onClick={this.handleClick}>button</button>
      </div>
    )
  }
  
}

export default TypewriterWrapper
  
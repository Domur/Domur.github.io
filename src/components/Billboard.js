import React from "react";
import TypewriterWrapper from "./Typewriter/TypewriterWrapper"

class Billboard extends React.Component {

  // constructor(props) {
  //   super(props)

  // }

  componentDidMount() {
    
  }

  handleClick = () => {
    this.setState({
      fulltext: ['noooo']
    })
  }

  render() {
    return (
      <div>
        <header className="flex flex-col h-screen w-screen justify-center items-center bg-snow-blue">
          <TypewriterWrapper className="text-[18rem] text-center" />
        </header>
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-sky-blue">
          <h1 className="text-[18rem] text-center">
            buttone
          </h1>
          <button className="text-9xl" onClick={this.handleClick}>button</button>
        </div>
      </div>
    )
  }
  
}

export default Billboard
  
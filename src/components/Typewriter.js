import React from "react";

class Typewriter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pos: {
        line: 0,
        index: 0
      },
      text: 'yo'
    }
  }

  render() {
    return (
      <h1 className="text-[18rem] text-center">
        {this.state.text}
      </h1>
    )
  }
  
}

export default Typewriter
  
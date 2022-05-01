import React from "react";

class Typetext extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      enabled: false
    }
  }

  render() {
    return (
      <h1 className="text-[18rem] text-center">
        {this.props.enabled}
      </h1>
    )
  }
  
}

export default Typetext
  
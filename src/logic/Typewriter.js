const Typewriter = {

  typeText(text = [], curLine, curIndex) {
    if(curLine >= text.length) { return }

    setTimeout(() => {
      if (curIndex < text[curLine].length) {
        return {
          typeText: FULL_TEXT[this.state.curLine].substring(0, this.state.curIndex + 1),
          curLine: state.curLine,
          curIndex: state.curIndex + 1
        }
      } else {
        return {
          typeText: FULL_TEXT[this.state.curLine].substring(0, this.state.curIndex + 1),
          curLine: state.curLine + 1,
          curIndex: 0
        }
      }
    }, ((Math.floor(Math.random() * 8) + 3) * 50))
  }

}

export default Typewriter
import React, { Component } from 'react';

class PreferenceQuestionComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(arrayToSlice, clickedValue){
    this.props.nextStep()
    this.props.updatePreference(arrayToSlice)
    this.props.saveSelection(this.props.questionName, clickedValue)
  }
  render() {
  	return(
  	  <div className={this.props.classProp}>
        <div className="question">
          <br /><br />
          <span className='questionText'>Question {this.props.questionNumber}/6:</span>
          <br />
          <div className="animated flipInX">
            {this.props.headerText}
          </div>
        </div>
        <ul className="answer">
          <li className="two-choices" onClick={() => {this.handleClick(this.props.choiceOneSlice, true)}}>
            <img src={this.props.imageOne}/>
            <a className="two-choices-link">{this.props.optionOneText}</a>
          </li>
          <li className="two-choices" onClick={() => {this.handleClick(this.props.choiceTwoSlice, false)}}>
            <img src={this.props.imageTwo}/>
            <a className="two-choices-link">{this.props.optionTwoText}</a>
          </li>
        </ul>
      </div>
      )
  }
}

export default PreferenceQuestionComponent;


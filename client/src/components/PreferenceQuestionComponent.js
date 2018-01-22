import React, { Component } from 'react';

class PreferenceQuestionComponent extends Component {

  handleClick(arrayToSlice, clickedValue){
    this.props.nextStep()
    this.props.updatePreference(arrayToSlice)
    this.props.saveSelection(this.props.questionName, clickedValue)
  }
  render() {
  	return(
  	  <div className={this.props.classProp}>
        <div className="question">
          <span className='questionText'>Question {this.props.questionNumber}/6:</span>
          <div className="animated flipInX">
            {this.props.headerText}
          </div>
        </div>
        <ul className="answer">
          <li className="two-choices" onClick={() => {this.handleClick(this.props.choiceOneSlice, true)}}>
            <img src={this.props.imageOne} alt="Option 1"/>
            <a className="two-choices-link">{this.props.optionOneText}</a>
          </li>
          <li className="two-choices" onClick={() => {this.handleClick(this.props.choiceTwoSlice, false)}}>
            <img src={this.props.imageTwo} alt="Option 2"/>
            <a className="two-choices-link">{this.props.optionTwoText}</a>
          </li>
        </ul>
      </div>
      )
  }
}

export default PreferenceQuestionComponent;


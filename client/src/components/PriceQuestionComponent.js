import React, { Component } from 'react';

class PriceQuestionComponent extends Component {

  handleClick(priceObj){
    this.props.nextStep()
    this.props.updateParentState(priceObj)
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
          <li className="two-choices" onClick={() => {this.handleClick({price: '1,2,3,4'})}}>
            <img src={this.props.imageOne} alt="I'm rich"/>
            <a className="two-choices-link">{this.props.optionOneText}</a>
          </li>
          <li className="two-choices" onClick={() => {this.handleClick({price: '1,2'})}}>
            <img src={this.props.imageTwo} alt="I'm broke"/>
            <a className="two-choices-link">{this.props.optionTwoText}</a>
          </li>
        </ul>
      </div>
      )
  }
}

export default PriceQuestionComponent;


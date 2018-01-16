import React, { Component } from 'react';
import StartMenuComponent from '../components/StartMenuComponent';
import LocationQuestionComponent from '../components/LocationQuestionComponent';
import DistanceQuestionComponent from '../components/DistanceQuestionComponent';
import PreferenceQuestionComponent from '../components/PreferenceQuestionComponent';
import SummaryComponent from '../components/SummaryComponent';
import ResultsComponent from '../components/ResultsComponent';

//This component's render switches on the current step of the form to return the appropriate component
//It might be better to change only save user selection on click and slice the array right before the API call. This would make it much easier to add a back button to the page in the future 
class InnerContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      foodArray: ["chinese", "pizza", "italian", "latin", "burgers", "sandwiches", "salad", "korean", "mexican", "japanese", "delis", "indpak", "sushi", "newamerican", "tradamerican", "caribbean", "diners", "seafood", "thai", "asianfusion", "bbq", "mediterranean", "buffets", "cheesesteaks", "chicken_wings", "comfortfood", "fishnchips", "foodstands", "gastropubs", "hotdogs", "soulfood", "soup", "tex-mex", "waffles"],
      selection: {},
      zip: '',
      coordinates: []
    };
    this.getCoordinates = this.getCoordinates.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.updatePreference = this.updatePreference.bind(this)
    this.saveSelection = this.saveSelection.bind(this)
    this.updateParentState = this.updateParentState.bind(this)
  }

  getCoordinates(){
    var showPosition = (position) => {
      this.setState({
      coordinates:{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    })
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
  }  
  returnPreference(value){
    var options = this.state
  }
  updatePreference(value){
    var currentArray = this.state.foodArray
    var newArray = currentArray.filter(e => value.indexOf(e) < 0)

    this.setState({
      foodArray: newArray
    })
  }
  saveSelection(questionName, choice){
    var newSelections = this.state.selection
    newSelections[questionName] = choice
    this.setState({
      selection: newSelections
    })
  }
  updateParentState(stateObj){
    this.setState(stateObj)
  }
  nextStep(){
    this.setState({
      step: this.state.step + 1
    })
  }
  render() {
    switch (this.state.step){
      case 0:
        return <StartMenuComponent 
                  nextStep={this.nextStep}
                />
      case 1:
        return <LocationQuestionComponent 
                  getCoordinates={this.getCoordinates}
                  updateParentState={this.updateParentState} 
                  nextStep={this.nextStep}
                />
      case 2:
        return <DistanceQuestionComponent 
                  nextStep={this.nextStep}
                  updateParentState={this.updateParentState}
                />
      case 3:
        return <PreferenceQuestionComponent 
                  questionNumber='2'
                  questionName="mood"
                  headerText="You feelin' good today?"
                  optionOneText='Sure'
                  imageOne='images/happy.svg'
                  choiceOneSlice={[]}
                  optionTwoText='Meh'
                  imageTwo='images/sad.svg'
                  choiceTwoSlice= {["latin", "sandwiches", "korean", "japanese", "delis", "sushi", "seafood", "asianfusion", "mediterranean", "salad", "foodstands", "hotdogs"]}
                  nextStep={this.nextStep}
                  updatePreference={this.updatePreference}
                  saveSelection={this.saveSelection}
                />
      case 4:
        return <PreferenceQuestionComponent 
                  questionNumber='3'
                  questionName="weather"
                  headerText="What's it like out there today?"
                  optionOneText='Sweaty Weather'
                  imageOne='images/hot.svg'
                  choiceOneSlice={["diners", "chinese", "buffets", "cheesesteaks", "chicken_wings", "soup", "tex-mex", "waffles"]}
                  optionTwoText='Sweater Weather'
                  imageTwo='images/cold.svg'
                  choiceTwoSlice={["salad", "sushi", "foodstands"]}
                  nextStep={this.nextStep}
                  updatePreference={this.updatePreference}
                  saveSelection={this.saveSelection}
                />
      case 5:
        return <PreferenceQuestionComponent 
                  questionNumber='4'
                  questionName="spicy"
                  headerText="You feeling frisky, hot stuff?"
                  optionOneText='Bring it on'
                  imageOne='images/spicy.svg'
                  choiceOneSlice={[]}
                  optionTwoText='Keep it mild'
                  imageTwo='images/nospicy.svg'
                  choiceTwoSlice={["mexican", "caribbean", "thai", "tex-mex"]}
                  nextStep={this.nextStep}
                  updatePreference={this.updatePreference}
                  saveSelection={this.saveSelection}
                />
      case 6:
        return <PreferenceQuestionComponent 
                  questionNumber='5'
                  questionName='healthy'
                  headerText="Are you eating healthy?"
                  optionOneText='Yes'
                  imageOne='images/gym.svg'
                  choiceOneSlice={["pizza", "diners", "bbq", "burgers", "chinese", "buffets", "cheesesteaks", "chicken_wings", "comfortfood", "foodstands", "gastropubs", "hotdogs", "soulfood", "tex-mex", "waffles", "fishnchips"]}
                  optionTwoText="No, it's a cheat day"
                  imageTwo='images/couch-potato.png'
                  choiceTwoSlice={[]}
                  nextStep={this.nextStep}
                  updatePreference={this.updatePreference}
                  saveSelection={this.saveSelection}
                />
      case 7:
        //The API can now handle price filtering so this needs to be added
        return <PreferenceQuestionComponent 
                  questionNumber='6'
                  questionName='price'
                  headerText="How deep are your pockets?"
                  optionOneText='Deep enough'
                  imageOne='images/rich.svg'
                  choiceOneSlice={[]}
                  optionTwoText="I'm broke"
                  imageTwo='images/poor.png'
                  choiceTwoSlice={[]}
                  nextStep={this.nextStep}
                  updatePreference={this.updatePreference}
                  saveSelection={this.saveSelection}
                />
      case 8:
        return <SummaryComponent 
                selection={this.state.selection}
                nextStep={this.nextStep}
                />
      case 9:
        return <ResultsComponent 
                foodArray={this.state.foodArray}
                latitude={this.state.coordinates.latitude}
                longitude={this.state.coordinates.longitude}
                zip={this.state.zip}
                />
      default:
        return <StartMenuComponent/>
    }

  }
}

export default InnerContentComponent;
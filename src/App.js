import './App.css';
import StepperComponent from './components/StepperComponent';

function App() {
  // Add as many set of two questions 
  // to render one extra pair in the stepper
  let questionSteps = [
    'what is your name?', 'where do you live?', 
    'what is your age?', 'what was your first school?',
    'what is your address?', 'how many cookies you can eat in one go?'
  ]

  return (
    <div className="App">
      <StepperComponent 
        steps={questionSteps}
      />
    </div>
  );
}

export default App;

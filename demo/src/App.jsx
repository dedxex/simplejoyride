import React from 'react';
import Joyride from 'scripts/Joyride';

import './styles.scss';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    //positions are top,bottom,right and left
    this.state = {
      autoStart: false,
      running: false,
      steps: [
        {
          title: 'This is the first Button',
          text: 'This step tests what happens when a target is missing',
          textAlign: 'center',
          selector: '.one',
          position: 'top'
        },
        {
          title: 'This is the Second Button',
          text: 'This step tests what happens when a target is missing',
          textAlign: 'center',
          selector: '.two',
          position: 'top'
        },
        {
          title: 'This is the Third Button',
          text: 'This step tests what happens when a target is missing',
          textAlign: 'center',
          selector: '.three',
          position: 'top'
        },
        {
          title: 'This is the Fourth Button',
          text: 'This step tests what happens when a target is missing',
          textAlign: 'center',
          selector: '.four',
          position: 'top'
        },
        {
          title: 'This is the Fifth Button',
          text: 'This step tests what happens when a target is missing',
          textAlign: 'center',
          selector: '.five',
          position: 'top'
        },
        {
          title: 'This is the Sixth Button',
          text: 'This step tests what happens when a target is missing',
          textAlign: 'center',
          selector: '.six',
          position: 'top'
        }
      ],
      step: 0,
    };

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
  }

  static propTypes = {
    joyride: React.PropTypes.shape({
      autoStart: React.PropTypes.bool,
      callback: React.PropTypes.func,
      run: React.PropTypes.bool,
    }),
  };

  static defaultProps = {
    joyride: {
      autoStart: false,
      resizeDebounce: false,
      run: false,
    },
  };

  componentDidMount() {
    //add tool tip on start
    this.joyride.addTooltip({
      title: 'The classic joyride',
      text: 'Let\'s go on a magical tour! Just click the big orange button.',
      selector: '.hero__tooltip',
      position: 'bottom',
      event: 'click',
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 0,
        color: '#fff',
        mainColor: '#ff67b4',
        textAlign: 'center',
        width: '29rem'
      }
    });

    this.joyride.addTooltip({
      title: 'A fixed tooltip',
      text: 'For fixed elements, you know?',
      selector: '.demo__footer img',
      position: 'top',
      isFixed: true,
      event: 'hover',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 0,
        color: '#333',
        textAlign: 'center',
        width: '29rem'
      }
    });
  }

  handleClickStart(e) {
    e.preventDefault();

    this.setState({
      running: true,
      step: 0,
    });
  }

  handleNextButtonClick() {
    if (this.state.step === 1) {
      this.joyride.next();
    }
  }

  handleJoyrideCallback(result) {
    const { joyride } = this.props;

    if (result.type === 'step:before') {
      // Keep internal state in sync with joyride
      this.setState({ step: result.index });
    }

    if (result.type === 'finished' && this.state.running) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ running: false });
    }

    if (result.type === 'error:target_not_found') {
      this.setState({
        step: result.action === 'back' ? result.index - 1 : result.index + 1,
        autoStart: result.action !== 'close' && result.action !== 'esc',
      });
    }

    if (typeof joyride.callback === 'function') {
      joyride.callback();
    }
  }

  render() {
    const { joyride } = this.props;
    const joyrideProps = {
      autoStart: joyride.autoStart || this.state.autoStart,
      callback: this.handleJoyrideCallback,
      debug: false,
      disableOverlay: this.state.step === 1,
      resizeDebounce: joyride.resizeDebounce,
      run: joyride.run || this.state.running,
      scrollToFirstStep: joyride.scrollToFirstStep || true,
      stepIndex: joyride.stepIndex || this.state.step,
      steps: joyride.steps || this.state.steps,
      type: 'single'
    };

    return (
      <div className="demo">
        <Joyride
          {...joyrideProps}
          ref={c => (this.joyride = c)} />
        <div>
          <div className="col-md-6">
            <h2><span>First Class</span></h2>
            <div className="classtwo">
              <div className="btn-group" role="group" >
                <button type="button" className="btn btn-secondary one">one</button>
                <button type="button" className="btn btn-secondary two ">Two</button>
                <button type="button" className="btn btn-secondary three">Three</button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2><span>Second Class</span></h2>
            <div className="classtwo">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary four">four</button>
                <button type="button" className="btn btn-secondary five ">Five</button>
                <button type="button" className="btn btn-secondary six">six</button>
              </div>
            </div>
          </div>

        </div>
        <main>
          <a href="#start" className="hero__start" onClick={this.handleClickStart}>Lets Go!</a>

        </main>
      </div>
    );
  }
}

import Dilithium from 'dilithium';
import ReactStackReconciler from 'react-stack-reconciler';

const isDilithium = window.location.search.includes('type=dilithium');
const React = isDilithium ? Dilithium : ReactStackReconciler;
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };

    this.updateCount = this.updateCount.bind(this);
    setInterval(() => {
      this.updateCount();
    });
  }

  updateCount() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h1>{`${this.props.title}(${this.state.count})`}</h1>
        <ColorSwitch number={this.state.count} />
        {this.state.count % 500 <= 250 ? (
          <i style={{ color: 'green', fontSize: '20px' }}>
            this should be at bottom
          </i>
        ) : (
          <b style={{ color: 'red', fontSize: '20px' }}>
            this should be at bottom
          </b>
        )}
        123
      </div>
    );
  }
}

class ColorSwitch extends React.Component {
  render() {
    const red = this.props.number % 256;
    return (
      <div
        style={{
          height: '50px',
          width: '50px',
          marginBottom: '20px',
          backgroundColor: `rgb(${red}, 0, 0)`,
        }}
      />
    );
  }
}

window.addEventListener('click', () => {
  React.render(
    <CounterButton
      title={`当前React为: ${
        isDilithium ? 'Dilithium' : 'ReactStackReconciler'
      }`}
    />,
    document.getElementById('container')
  );
});

import Dilithium from 'dilithium';

class CounterButton extends Dilithium.Component {
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
        <h1>{this.props.title}</h1>
        <ColorSwitch number={this.state.count} />
        {/* {this.state.count % 2000 <= 1000 ? (
          <div style={{ color: 'green' }}>this should be at bottom</div>
        ) : (
          <div style={{ color: 'red' }}>this should be at bottom</div>
        )} */}
        {/* TODO: following will have mount position bug */}
        {this.state.count % 2 === 0 ? (
          <div style={{ color: 'green' }}>this should be at bottom</div>
        ) : (
          <b style={{ color: 'red' }}>this should be at bottom</b>
        )}
      </div>
    );
  }
}

class ColorSwitch extends Dilithium.Component {
  render() {
    const red = this.props.number % 256;
    return (
      <div
        style={{
          backgroundColor: `rgb(${red}, 0, 0)`,
          height: '50px',
          width: '50px',
        }}
      />
    );
  }
}

window.addEventListener('click', () => {
  Dilithium.render(
    <CounterButton title="Hello React Rally!" />,
    document.getElementById('container')
  );
});

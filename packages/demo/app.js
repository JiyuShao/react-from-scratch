import React from 'react-stack-reconciler';

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
        <h1>{this.props.title}</h1>
        <ColorSwitch number={this.state.count} />
        {this.state.count % 500 <= 250 ? (
          <div style={{ color: 'green' }}>this should be at bottom</div>
        ) : (
          <b style={{ color: 'red' }}>this should be at bottom</b>
        )}
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
          backgroundColor: `rgb(${red}, 0, 0)`,
          height: '50px',
          width: '50px',
        }}
      />
    );
  }
}

window.addEventListener('click', () => {
  React.render(
    <CounterButton title="Hello React Rally!" />,
    document.getElementById('container')
  );
});

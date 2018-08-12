import React, { Component } from "React";
import ReactDOM from "react-dom";
import { Segment } from 'semantic-ui-react';
import Title from "./components/title";
import StatusSummary from "./components/status_summary";
import Enter from "./components/enter";
import lottery from "./ethereum/lottery";
import web3 from "./ethereum/web3";
import 'babel-polyfill';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      managerAddress: '',
      balance: '0',
      accounts: [],
      manager: '',
      players: [],
      value: '',
      message: '',
      winner: '',
      playerNames: []
    };
  }
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({accounts});
    console.log(accounts[0]);
    this.statusSummaryUpdate();
  }
  async statusSummaryUpdate() {
    const pot = (web3.utils.fromWei(await lottery.methods.getPot().call(), 'ether'));
    const players = await lottery.methods.getPlayers().call();
    this.setState({ balance: pot });
    this.setState({ players });

  }
  async enterUser() {

    this.setState({ message: 'Waiting on transaction success...' });
    await lottery.methods.enter().send({
      from: this.state.accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    this.setState({ message: 'You have been entered into the lottery!' });
    this.statusSummaryUpdate();
  }
  render() {
    return (


      <div>
        <br />
        <Segment.Group>
          <Segment vertical textAlign='center' size='mini'>
            <Title players={this.state.players.length} balance={this.state.balance} />
            <StatusSummary players={this.state.players.length} balance={this.state.balance} />
            <Enter message={this.state.message} parentMethod={() => this.enterUser()} />
          </Segment>
        </Segment.Group>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));

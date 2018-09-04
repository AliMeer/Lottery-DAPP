import React, { Component } from "React";
import ReactDOM from "react-dom";
import { Segment } from 'semantic-ui-react';
import Title from "./components/title";
import StatusSummary from "./components/status_summary";
import StatusDetail from "./components/status_detail";
import History from "./components/history"
import Enter from "./components/enter";
import lottery from "./ethereum/lottery";
import web3 from "./ethereum/web3";
import 'babel-polyfill';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      managerAddress: '',
      manager: '',
      balance: '0',
      accounts: [],
      players: [],
      playerNames: [],
      previousPlayers: [],
      previousNames: [],
      value: '',
      message: '',
      winnerAddy: '',
      winnerName: '',
      winnerPot: ''

    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({accounts});
    console.log("accounts[0]: " + accounts[0]);
    this.statusSummaryUpdate();
  }
  async statusSummaryUpdate() {
    var playerNames =[];
    var previousNames = [];
    const balance = (web3.utils.fromWei(await lottery.methods.getPot().call(), 'ether'));
    const players = await lottery.methods.getPlayers().call();
    const previousPlayers = await lottery.methods.getPreviousPlayers().call();
    for(var i = 0;i<players.length;i++) {
      playerNames[i] = await lottery.methods.playerNames(i).call();
    }
    for(var j=0;j<previousPlayers.length;j++) {
      previousNames[j] = await lottery.methods.previousNames(j).call();
    }
    const winnerAddy = await lottery.methods.previousAddy().call();
    const winnerName = await lottery.methods.previousName().call();
    const winnerPot = web3.utils.fromWei(await lottery.methods.previousPot().call(), 'ether');
    
    this.setState({ balance, players, previousPlayers, playerNames, previousNames, winnerPot, winnerAddy, winnerName });

  }

  renderStatus()  {
    return (
      <StatusDetail 
      winnerAddy={this.state.winnerAddy} 
      winnerName={this.state.winnerName}
      winnerPot={this.state.winnerPot}
      players={this.state.players}
      playerNames={this.state.playerNames}
        />
    );
  }
  async enterUser(name) {

    this.setState({ message: 'Waiting on transaction success...' });
    await lottery.methods.enter(name).send({
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
            <Enter message={this.state.message} parentMethod={(n) => this.enterUser(n)} />
             {(this.state.playerNames.length>0) ?
                this.renderStatus() : ""
              }
              <History 
            winnerAddy={this.state.winnerAddy} 
            winnerName={this.state.winnerName}
            winnerPot={this.state.winnerPot}
            previousPlayers={this.state.previousPlayers}
            previousNames={this.state.previousNames}
              />
          </Segment>
        </Segment.Group>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));

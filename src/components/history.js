import React, { Component } from "react";
import {
  Segment,
  Icon,
  Label,
  Header,
  Divider,
  Message,
  Image,
  Table,
  Button,
  Transition,
  TransitionGroup
} from "semantic-ui-react";
import "babel-polyfill";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    var visible = this.state.visible;
    console.log("visible:" + visible);
    var i = 0;
    return (
      <div>
        <center>
        <Header as='h2' textAlign='center'>
            <Header.Content>
            <font color='#2701bc'>Winner of Last Round</font>
            <Header.Subheader>Congratulations on winning <b>{this.props.winnerPot} Ether</b></Header.Subheader>
            <Header.Subheader>Name : <b>{this.props.winnerName} </b>Address: <b>{this.props.winnerAddy}</b></Header.Subheader>
            </Header.Content>
          </Header>
          <Divider />

          
          <Header as="h3" textAlign="center" onClick={this.toggleVisibility}>
            <font color="#2701bc">
              <Icon name="users" size="large" />
            </font>
            <Header.Content>
              <font color="#2701bc">
                {visible ? "Hide" : "Show"} all players from last round
              </font>
            </Header.Content>
          </Header>

          <Transition visible={visible} animation="slide down" duration={500}>
            <TransitionGroup>
              <React.Fragment>
                <Table basic="very" celled collapsing verticalAlign="middle">
                  <Table.Header>
                    <Table.Row verticalAlign="middle">
                      <Table.HeaderCell>#</Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Public Address</Table.HeaderCell>
                      <Table.HeaderCell>Ether Entered</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {this.props.previousNames.map(name => (
                      <Table.Row key={name}>
                        <Table.Cell>{++i}</Table.Cell>
                        <Table.Cell>
                          {this.props.previousNames[i - 1]}
                        </Table.Cell>
                        <Table.Cell>
                          {this.props.previousPlayers[i - 1]}
                        </Table.Cell>
                        <Table.Cell>0.02</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </React.Fragment>
            </TransitionGroup>
          </Transition>
        </center>
      </div>
    );
  }
}

export default History;

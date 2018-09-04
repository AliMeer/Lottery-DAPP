import React, { Component } from "react";
import {
  
  Icon,

  Header,
  Divider,
  
  Table
 
} from "semantic-ui-react";
import "babel-polyfill";

class StatusDetail extends Component {
  constructor(props) {
    super(props);
   
  }
  

  
  render() {
  
    var i=0;
    return (
        
      <div>
          <center>

          <Header as='h3' textAlign='center'>
            <Header.Content>
            <font color='#010101'>current list of players entered in lottery</font>
            
            </Header.Content>
          </Header>
      
<Table basic='very' celled collapsing verticalAlign='middle'>
    <Table.Header>
      <Table.Row verticalAlign='middle'>
      <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Public Address</Table.HeaderCell>
        <Table.HeaderCell>Ether Entered</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>

 {
 this.props.playerNames.map((name) => (

      <Table.Row key={name}>
        <Table.Cell>{++i}</Table.Cell>
        <Table.Cell>{this.props.playerNames[i-1]}</Table.Cell>
        <Table.Cell>{this.props.players[i-1]}</Table.Cell>
        <Table.Cell>0.02</Table.Cell>
      </Table.Row>
    ))}

    </Table.Body>
  </Table>
  
  <Divider />
        
        <Header as='h2' textAlign='center'>
            <Header.Content>
            <font color='#2701bc'>Winner of Last Round</font>
            <Header.Subheader>Congratulations on winning <b>{this.props.winnerPot} Ether</b></Header.Subheader>
            <Header.Subheader>Name : <b>{this.props.winnerName} </b>Address: <b>{this.props.winnerAddy}</b></Header.Subheader>
            </Header.Content>
          </Header>
          <Divider />
          
      
  </center>
      </div>
    );
  }
}

export default StatusDetail;

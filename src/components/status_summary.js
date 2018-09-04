import React, {Component} from 'react';
import {Segment, Icon, Label, Header } from 'semantic-ui-react';
import 'babel-polyfill';

class StatusSummary extends Component   {
    constructor(props)  {
        super(props);
    }
    
    render()    {
        return  (
            <div>
            <Header as='h3' textAlign='center'>
            {this.props.balance} Ether up for grabs by {this.props.players} users
            </Header>

            </div>
        );
    }
}

export default StatusSummary;
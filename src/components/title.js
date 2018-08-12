import React, {Component} from 'react';
import {Icon, Header, Segment } from 'semantic-ui-react';
import StatusSummary from './status_summary';

class Title extends Component   {
    constructor(props)  {
        super(props);
    }

    render()    {
        return (
            <Header as='h1' textAlign='center'>
            <font color='#2701bc'><Icon name='ethereum' size='large' /></font>
            <Header.Content>
            <font color='#2701bc'>Smart Lottery</font>
              <Header.Subheader>Chance to win Ethereum!</Header.Subheader>
            </Header.Content>
          </Header>
        );
    }
}

export default Title;
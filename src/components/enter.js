import { Button, Icon, Input, Header } from "semantic-ui-react";
import PropTypes from 'react';
import React, { Component } from "react";
import lottery from "../ethereum/lottery";
import web3 from "../ethereum/web3";
import "babel-polyfill";

class Enter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Anonymous',
            
        }
    }
    click() {
        this.props.parentMethod();
    }

    render() {
        
        return (
            <div>
                <br />
                <Input onChange={event => this.setState({ name: event.target.value })} placeholder='Name(Optional)' />
                <Button attached='left' icon labelPosition='right' onClick={() => this.click()} >
                    Enter
                <Icon name='right chevron' />
                </Button>
                <Header as='h4' color='blue'>
                    {this.props.message}
                </Header>
            </div>
        );
    }
}

export default Enter;


//export default InputExampleAction
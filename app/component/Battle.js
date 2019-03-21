import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component{
    static propTypes = {
        id:propTypes.string.isRequired,
        label:propTypes.string.isRequired,
        onSubmit:propTypes.func.isRequired
    }
    static defaultProps = {
        label: 'Username',
    }
    state = {
        username:''
    }
    handleChange = (event) => {
        const value = event.target.value;
        this.setState(()=>({username:value}))
    }

        
    handleSubmit = (event) => {
        event.preventDefault();
         this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }

    render(){
        const {username}=this.state
        const {label}=this.props
        return(
            <form className='column' onSubmit={this.handleSubmit}>
              <label className='header' htmlFor='username'>{label}</label>
              <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    value={username}
                    autoComplete='off'
                    onChange={this.handleChange}
                />
                <button
                    className ='button'
                    type='submit'
                    disabled={!username}>
                        Submit
                </button>


            </form>

        )
    }
}

class Battle extends React.Component{
    state={
        playerOneName:'',
        playerTwoName:'',
        playerOnerImage:null,
        playerTwoImage:null
    }
    
    handleSubmit = (id,username) => {
        this.setState(()=>({
            [id + 'Name'] :username,
            [id + 'Image'] : `https://github.com/${username}.png?size=200`
        }))
    }
    handleReset = (id) => {
        this.setState(()=>({
            [id + 'Name']:'',
            [id + 'Image']:null
        }))
          
    }
    render(){
        const {match }= this.props;
        const {playerOneName,playerTwoName,playerOneImage,playerTwoImage}=this.state

        
        return(
            <div>
                <div className ='row'>
                    {!playerOneName &&
                    <PlayerInput 
                         id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}
                    />}
                    {playerOneImage  &&
                    <PlayerPreview
                        avatar={playerOneImage}
                        username={playerOneName}>
                        
                            <button
                                className='reset'
                                onClick={()=>this.handleReset('playerOne')}>
                                 Reset
                            </button>
                        
                        
                    </PlayerPreview>}
                    
                    {!playerTwoName &&
                    <PlayerInput 
                        id='playerTwo'
                        label='Player Two'
                        onSubmit={this.handleSubmit}
                    />}
                    {playerTwoImage  &&
                    <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}>
                        
                        <button
                                className='reset'
                                onClick={()=>this.handleReset('playerTwo')}>
                                 Reset
                            </button>
                        
                        
                    </PlayerPreview>}
                </div>

                    {playerOneImage && playerTwoImage &&
                    <Link
                        className='button'
                        to={{
                            pathname: match.url + '/results',
                            search:`?playerOneName=${playerOneName} &playerTwoName=${playerTwoName}`
                        }}>
                        Battle
                    </Link>}
            </div>

        )
    }
}
export default Battle;
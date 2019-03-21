import React from 'react';
import propTypes from 'prop-types';
import queryString from 'query-string';
import {battle} from '../utils/api';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile({info}){
    return(
        <PlayerPreview  avatar={info.avatar_url} username={info.login}>
                <ul className='space-list-items'>
                    {info.name && <li>{info.name}</li>}
                    {info.location && <li>{info.location}</li>}
                    {info.company && <li>{info.company}</li>}
                    <li>Followers: {info.followers}</li>
                    <li>Following: {info.following}</li>
                    <li>Public Repos: {info.public_repos}</li>
                    {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
                </ul>
        </PlayerPreview>

    )
}
Profile.propTypes = {
    info : propTypes.object.isRequired,
}

function Player({label,score,profile}){
    return(
        <div>
            <h1 className='header'>{label}</h1>
            <h3 style={{textAlign:'center'}}>Score:{score}</h3>
            <Profile info ={profile}/>
        </div>

    )
}

Player.propTypes={
    label:propTypes.string.isRequired,
    score:propTypes.number.isRequired,
    profile:propTypes.object.isRequired,
}

class Results extends React.Component{
    state={
        winner:null,
        loser:null,
        error:null,
        loading:true,

    }
    async componentDidMount(){
      const {playerOneName,playerTwoName} = queryString.parse(this.props.location.search);
      const players =  await battle([
          playerOneName,
          playerTwoName
        ])
            if(players === null){
                return this.setState(()=>({
                    error : 'Looks like there was  error .check that both user exist on Github',
                    loading : false,
            
                }));
            }
            this.setState(()=>({
                
                    error:null,
                    winner:players[0],
                    loser:players[1],
                    loading:false,
            
            }));
    
    }
    
    render(){
        const {error,winner,loser,loading}=this.state;
         if (loading === true){
            return <Loading/>
        }
        if (error){
            return(
                <div>
                    <p>{error}</p>
                    <Link to ='/battle'>Reset</Link>
                </div>
            )
        }
        
        return(
            <div className='row'>
            <Player
                label='winner'
                score={winner.score}
                profile={winner.profile}
            />
            <Player
                label='loser'
                score={loser.score}
                profile={loser.profile}
            />
            </div>
        )
    }
}
export default Results;
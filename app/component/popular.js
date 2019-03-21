import React from 'react';
import propTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';
import Loading from './Loading';

function SelectLanguage({selectedLanguage,onSelect}){
    const languages = ['All','JavaScript','Ruby','Java','CSS','Python'];
    return(
        <ul className = 'languages'>
             {languages.map((lang)=> (
                    <li 
                        style = {lang === selectedLanguage ?{color:'#d0021b'}:null}
                        onClick = {()=>onSelect(lang)}
                        key = {lang}>
                        {lang}
                    </li>
                ))}
        </ul>

    )
}
function RepoGrid({repos}){
    return(
        <ul className='popular-list'>
        {repos.map(({name,stargazers_count,owner,html_url},index)=> (
            <li key={name}className='popular-item'>
                <div className='popular-rank'>#{index +1}</div>
                <ul className='space-list-items'>
                    <li>
                        <img className='avatar' src={owner.avatar_url}
                        alt={'Avatar for'+owner.login}/>
                    </li>
                    <li> <a href={html_url}>{name}</a></li>
                    <li>@{owner.login}</li>
                    <li>{stargazers_count}stars</li>
                </ul>
            </li>
        ))}
        </ul>
    )
}

RepoGrid.propTypes={
    repos:propTypes.array.isRequired,
}
SelectLanguage.propTypes ={
    selectedLanguage:propTypes.string.isRequired,
    onSelect:propTypes.func.isRequired,
};

class popular extends React.Component{
    state ={
        selectedLanguage:'All',
              repos:null
    }
   
    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage);
    }
    updateLanguage = async (lang)=> {
        this.setState(()=> ({
            selectedLanguage : lang,
            repos:null
        }));
        const repos =await fetchPopularRepos(lang)
            this.setState(()=>({repos:repos}))
    }
    render(){
        const {selectedLanguage,repos}=this.state
         return(
            <div>
                <SelectLanguage
                selectedLanguage={selectedLanguage}
                onSelect={this.updateLanguage}
                />
                {!repos
                ?<Loading/>
                : <RepoGrid repos={repos}/>}
                
            </div>
        )
            
    }                  
}
 export default popular;
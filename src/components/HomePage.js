import React, {Component} from 'react';
import axios from 'axios';
import BeerList from './BeerList';
import SearchBar from './SearchBar';
import NavBar from './NavBar';

class HomePage extends Component{
  constructor(props){
    super(props);
    this.state ={beers:[], error:''};
    //this.searchBeer = this.searchBeer.bind(this);
  }
 //let's display random beers on homepage!
 //includes image of a beer and info about that beer
 componentDidMount(){
  axios.get('https://api.punkapi.com/v2/beers?page=2&per_page=20')
  .then((result) => {
    this.setState(()=>{
      return {
        beers: result.data}
      })
     
  })
}

beerSearch(term){
  const queryAPI = `https://api.punkapi.com/v2/beers?beer_name=${term}`
  axios.get(queryAPI).then((results)=>{
    
    this.setState({beers: results.data, error:''});
  })
  .catch((error) => {
    if(error.response.status === 401) {
      this.setState({ error: "Sorry! We couldn't find any beers as requested" });
      console.log(error)
    }
  });
}
  
render(){
   return(
     <div>
       <NavBar/>
       <SearchBar onSearchTermChange={term => this.beerSearch(term)}/>
         <BeerList beers={this.state.beers}/>
     </div>
   )

    
  }
                 
}

export default HomePage;

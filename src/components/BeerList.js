import React from 'react';
import BeerListItem from './BeerListItem';

const BeerList = (props) =>{
    const beerItems = props.beers.map((beer) => {
        return <BeerListItem  key={beer.id} beer = {beer}/> 
      });
      return (<ul className = "col-md-12 list-group">{beerItems}</ul>);
    };

export default BeerList;
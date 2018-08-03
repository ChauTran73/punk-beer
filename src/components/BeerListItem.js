import React from 'react';

const BeerListItem = ({beer}) =>{ 
  const imageURL = beer.image_url;
  return (<li  className="list-group-item">
  <div>
    <div >
      <img  src={imageURL}/>
    </div>
    <div >
      <div >Name: {beer.name}</div>
    </div>
    <div >
      <div>Description: {beer.description}</div>
    </div>
    <div >
      Best when paired with: 
        {beer.food_pairing.map((item,k)=>
        {return <div key={k}>{item}</div>})}
        
    </div>
    </div>

  </li>)
};

export default BeerListItem;

import React from 'react';
import HomePage from '../HomePage';
import Splash from '../Splash';


function HomePageContainer({ authenticated }) {

  const homePageSelector = () => {
  if (authenticated) {
    return (
      <HomePage />
    );
  } else {
    return (
      <Splash />
    )
  }
}

  return (
    <>
      {homePageSelector()}
    </>
    )
};

export default HomePageContainer;
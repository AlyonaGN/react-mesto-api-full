import React from 'react';

function AuthenticationPage(props) {

  return (

    <form className ="authentication" name={`${props.name}`} onSubmit={props.onSubmit} noValidate>

        <h2 className="authentication__header">{`${props.title}`}</h2>
        
        {props.children}

   </form>
  );
}

export default AuthenticationPage;
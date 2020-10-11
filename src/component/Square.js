
import React from 'react';

export default function Square (props) {
      return (
        <button className={props.winCell?"square red-text":"square"} onClick={()=>props.onClick()}>
          {props.value}
        </button>
      );
}
  

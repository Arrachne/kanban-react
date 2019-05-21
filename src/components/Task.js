import React from 'react';

function Task(props) {
    var text = props.text 
    return (
      <div className='task'>
        {text}
      </div>
    );
  }
  
  export default Task;
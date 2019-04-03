import React, { useState, useEffect }  from 'react'

function Calendar(props) {

    const handleInput = (val) => {       
        props.setValue(val);
    }
  
  return (
    <div>
        <input type="date" id="DateOfOrder" defaultValue={props.date} onChange={e => handleInput(e.currentTarget.value)} />
    </div>
  )
}

export default Calendar


import React from 'react'
import LineChart from '../grpah/LineGraph';
import BarGraph from '../grpah/BarGraph';
import TwoLineGraph from '../grpah/TwoLineGraph';


const Main = () => {

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-2'>

          <div className='bg-violet-200 p-4 rounded shadow'> Card </div>
          <div className='bg-violet-200 p-4 rounded shadow'> Card </div>
          <div className='bg-violet-200 p-4 rounded shadow'> Card </div>
            

      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>

          <div className='bg-violet-200 p-4 rounded shadow'> <TwoLineGraph/> </div>
          <div className='bg-violet-200 p-4 rounded shadow'> <BarGraph/> </div>
            

      </div>
    </div>
  )
}

export default Main;

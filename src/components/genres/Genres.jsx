import React from 'react'
import { useSelector } from 'react-redux';


import './style.scss'
function Genres({data}) {
    // console.log(data);
    const {genres} = useSelector(state => state.home)
    // console.log(genres)
  return (
    <div className='genres'>
        {
            data?.map(g => {
                if(!genres[g]?.name) return
                return (
                    <div className="genre">
                        {genres[g]?.name}
                    </div>
                )
            })
        }
    </div>
  )
}

export default Genres
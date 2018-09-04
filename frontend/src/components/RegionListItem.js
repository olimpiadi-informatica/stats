import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const RegionListItem = ({region}) => {
  if(!region) return <div className='Loading'>Loading ...</div>

  return (
    <li className='RegionListItemContainer list-group-item'>
      <div className='align-items-center'>
        <div>
          <Link  to={`/region/${region.id}`}>{region.id}</Link>
        </div>
      </div>
    </li>
  )
}

export default RegionListItem

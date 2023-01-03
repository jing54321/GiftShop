import React, {Fragment} from 'react'
import  PropTypes  from 'prop-types';

const Rating = ({value, text}) => {
  const stars = [];
  for(let i = 1; i < 6; i++) {
        value >= i ? stars.push(1) : value >= i-0.5? stars.push(0.5) : stars.push(0)
  }
  return (
    <Fragment>
        <div className="my-3">
           {stars.map((star,idx) => 
            star===1? <i key = {idx} className="fa-solid fa-star text-warning"></i>:
            star===0.5? <i key = {idx} className="fa-regular fa-star-half-stroke text-warning"></i> : <i key = {idx} className="fa-regular fa-star text-warning"></i> )} {text && text}
        </div>
    </Fragment>
  )
}

Rating.propTypes = {
    value : PropTypes.number.isRequired,
    text : PropTypes.string.isRequired
}

export default Rating

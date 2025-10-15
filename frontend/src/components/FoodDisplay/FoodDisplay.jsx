import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { foodList, loadingFoodList } = useContext(StoreContext)

    return (
        <div className='food-display' id='food-display'>
            {!loadingFoodList ?
                <div>
                    <h2>Top dishes near you</h2>
                    <div className="food-display-list">
                        {foodList.map((item, index) => {

                            if (category == "All" || category == item.category) {
                                return (
                                    <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                                )
                            }
                        })}
                    </div>
                </div> :

                <div className='loading-items'>
                    <div className="spinner-content">
                        <i style={{ fontSize: '2rem' }}></i>
                        <h2>Loading...</h2>
                    </div>
                </div>
            }
        </div>
    )
}

export default FoodDisplay
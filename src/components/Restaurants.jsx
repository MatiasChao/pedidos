import React, { Fragment } from 'react'
const Restaurants = ({restaurants, loading}) => { 
    return(
        <Fragment>
            { loading && <h2> Loading... </h2> }

            {
                restaurants && 
                <ul className="list-group mb-4">
                    {
                        restaurants.map((r, i) => (
                            <li key={i} className="list-group-item">
                                <p className="font-weight-bold"> 
                                    <a href={`https://www.pedidosya.com.uy/restaurantes/montevideo/${r.link}-menu`} style={{textDecoration: 'none'}}>
                                        { r.name }
                                    </a> 
                                    <span className="font-weight-light"> ☆ { r.ratingScore } </span> 
                                </p>
                                <img src={`https://d1v73nxuzaqxgd.cloudfront.net/restaurants/${r.logo}`} width="50" height="50"></img>
                                <span className="font-weight-light ml-2" style={{fontSize: '12px'}}>Tiempo de entrega {r.deliveryTimeMaxMinutes}</span>
                            </li>
                        ))
                    } 
                </ul>
            }
        </Fragment>
    )
}

export default Restaurants
import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"

const CATEGORY  = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
          name,
          id ,
          reviews {
                title,
                body,
                rating,
                id,
                categories {
                    name,
                    id
                }
          }
        } 
    }
`
export default function Category() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(CATEGORY, {
        variables: { id: id}
    });
    if (loading) return <p>loading...</p>
    if (error) return <p>error...</p>

    return (
        <div>
            <h2>{data.category.name}</h2>
            {data.category.reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.rating}</div>
                    <h2>{review.title}</h2>
                    {review.categories.map(item => (
                        <small key={item.id}>{item.name}</small>
                    ))}
                    
                    <p>{review.body.substring(0,200)}...</p>
                    <Link to={`/details/${review.id}`}>
                        Read more
                    </Link>
                </div>
            ))}
        </div>
    )
}

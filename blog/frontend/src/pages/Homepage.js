import { Link } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"


const REVIEWS = gql`
    query GetReviews {
        reviews {
            title,
            body,
            rating,
            id,
            categories {
                id,
                name
            }
        }
    }
`

export default function Homepage() {
    const { loading, error, data } = useQuery(REVIEWS);
    if (loading) return <p>loading...</p>
    if (error) return <p>error...</p>

    return (
        <div>
            {data.reviews.map(review => (
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

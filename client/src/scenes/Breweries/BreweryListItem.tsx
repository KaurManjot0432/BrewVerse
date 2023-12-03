import react from 'react';


interface BreweryItemProps {
    brewery: {
        id: string;
        name: string;
        brewery_type: string;
        address_1: string;
        address_2: string;
        address_3: string;
        city: string;
        state_province: string;
        postal_code: string;
        country: string;
        longitude: string;
        latitude: string;
        phone: string;
        website_url: string;
        state: string;
        street: string;
    };
}

const BreweryListItem : React.FC<BreweryItemProps> = ({ brewery })  => {
    return (
        <div my-3>
        <div className="card">
        <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                right: '0'
            }
            }>

                <span className="badge rounded-pill bg-danger"> {brewery.brewery_type} </span>
            </div>
            <div className = "card-body">
            <h5 className = "card-title">{brewery.name}</h5>
            <p className = "card-text">{brewery.address_1}</p>
            <p className="card-text"><small className="text-muted">By {brewery.country}</small></p>
            <a href={brewery.website_url}   target="_blank" className = "btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
    </div>
    )
}

export default BreweryListItem;
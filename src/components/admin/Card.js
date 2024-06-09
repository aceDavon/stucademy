import "../../styles/comoponents_pages/cards.scss" 

export default function Card({icon, title, count, percentage}){
    return(
        <div className="card-container">
           <div className="icon">
            <img src={icon} alt="" />

           </div>
           <div className="title">
            {title}
           </div>
           <div className="card-footer">
            <div className="count">
                {count}
            </div>
            <div className={percentage>=20?"percentage high-percentage":"percentage low-percentage"}>
            {percentage? percentage +"%":""}
            </div>
           </div>
        </div>
    )

}
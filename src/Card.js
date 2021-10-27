import {React} from "react";

const Card = ({image_url, title, index}) => {
  return (
    <div className="anime" key={index}>
      <img src={image_url} className="animeImage" alt="anime"></img>
      <div className="anime-title-background">
        <p className="anime-title">{title}</p>
      </div>
    </div>
  );
};

export default Card;

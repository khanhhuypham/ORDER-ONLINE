import { useEffect, useState } from "react";
import defaultFoodImage from "../../assets/images/food-default.jpg"


export const Image = ({ imageUrl,defaultImg, className }: { imageUrl: string,defaultImg?: string, className?:string }) => {
    // const defaultImage = defaultImage; // Replace with your default image path
    const [imageSrc, setImageSrc] = useState(imageUrl || defaultFoodImage);

    useEffect(()=>{
        setImageSrc(imageUrl);
    },[imageUrl])

    return (
        <img
            alt="Image"
            src={process.env.REACT_APP_RESOURCE_DOMAIN_URL+imageSrc}
            className={className}
            onError={(e) => {
                // e.currentTarget.onerror = null; // Prevent infinite loop
                // setImageSrc(defaultImage);
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultImg ?? defaultFoodImage
            }}
        />
    );
};

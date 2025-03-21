import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";

export default function HomePageBody() {
    const images = [
        {
            url : "https://i.pinimg.com/1200x/65/6e/f2/656ef2cb9e82a5c102e723bf997a4cb2.jpg",
            title : "Image 1"
        },
        {
            url : "https://i.pinimg.com/1200x/55/9d/62/559d62ebef1bf7d2eda990704eae17ba.jpg",
            title : "Image 2"
        },
        {
            url : "https://i.pinimg.com/1200x/32/62/39/3262391ce4a1311f7f429ab244ba43ca.jpg",
            title : "Image 3"
        },
        {
            url : "https://i.pinimg.com/1200x/f7/a6/69/f7a6699c16b50cb4d3b2c78cf0d47a56.jpg",
            title : "Image 4"
        },
        {
            url : "https://i.pinimg.com/1200x/fb/4c/ec/fb4cecc19ccc549a7b8e3e415c9c2376.jpg",
            title : "Image 5"
        },
    ];
    const [activeindex, setActiveIndex] = useState(0);

    const nextImage = () => {
        const isFirstSlide = activeindex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : activeindex - 1;
        setActiveIndex(newIndex);
    };

    const prevImage = () => {
        const isLastSlide = activeindex === images.length - 1;
        const newIndex = isLastSlide ? 0 : activeindex + 1;
        setActiveIndex(newIndex);
    };
    
    return(
        <div className="flex flex-row justify-center mt-10 relative group">
            <div className="w-6xl h-[500px]  rounded-2xl overflow-hidden  duration-100">
                <img src={images[activeindex].url} 
                className="w-full h-full bg-cover"/>
            </div>
            <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-15 text-2xl rounded-lg bg-black/20 text-white cursor-pointer ">
                <FaChevronLeft onClick={prevImage} size={30}/>
            </div>

            <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-15 text-2xl rounded-lg bg-black/20 text-white cursor-pointer">
                <FaChevronRight onClick={nextImage} size={30}/>
            </div>

            <div className="absolute bottom-4 flex flex-row justify-center gap-2 mt-2">
                {
                    images.map((image, index) => (

                        <div className="text-2xl cursor-pointer text-white">
                            <RxDotFilled key={index} onClick={() => setActiveIndex(index)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
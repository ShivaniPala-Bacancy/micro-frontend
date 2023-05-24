import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

export interface SimpleImageSliderProps {
    files: any;
}
const Slideshow: React.FC<SimpleImageSliderProps> = (props) => {
    const {files} = props;

    const images = [] as any;

    files.forEach((file: any) => {
        images.push({url: file.preview});
    });

    return (
        <div
            style={{
                width: '765px',
                height: '500px'
            }}
        >
            <SimpleImageSlider
                width="765px"
                height="500px"
                showNavs
                showBullets
                images={images}
                slideDuration={0.5}
            />
        </div>
    );
};

export default Slideshow;

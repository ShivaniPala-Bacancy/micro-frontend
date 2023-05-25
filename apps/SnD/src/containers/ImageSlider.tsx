import React, {useState} from 'react';
import {Row} from 'react-bootstrap';

/* eslint-disable react/button-has-type,no-param-reassign,no-case-declarations , prefer-template,operator-assignment */
export interface ImageSliderProps {
    files: any;
}
const ImageSlider: React.FC<ImageSliderProps> = (props) => {
    const {files} = props;

    const [index, setIndex] = useState(0);

    const images = [] as any;

    files.forEach((file: any) => {
        images.push({url: file.preview});
    });

    const slideRight = () => {
        setIndex((index + 1) % images.length); // increases index by 1
    };

    const slideLeft = () => {
        const nextIndex = index - 1;
        if (nextIndex < 0) {
            setIndex(images.length - 1); // returns last index of images array if index is less than 0
        } else {
            setIndex(nextIndex);
        }
    };

    return (
        <>
            <div>
                <Row>
                    <button onClick={slideLeft}>{'<'}</button>
                    <img src={images[index].url} />
                    <button onClick={slideRight}>{'>'}</button>
                </Row>
            </div>
        </>
    );
};

export default ImageSlider;

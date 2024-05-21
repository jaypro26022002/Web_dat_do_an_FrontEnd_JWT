import React from 'react';
import imgttop from '../img/imgTop.jpg';
import iconBrand from '../img/ico_lang_en.svg';
import food from '../img/food1.jpg';

const Img = ({ alt1 = 'image1', width = 'auto', height = 'auto', style = {}, className = '' }) => (
    <img src={imgttop} alt={alt1} width={1900} height={height} style={style} className={className} />
);
const Icon = ({ alt2 = 'image2', width = 'auto', height = 'auto', style = {}, className = '' }) => (
    <img src={iconBrand} alt={alt2} width={50} height={height} style={style} className={className} />
);
const Food = ({ alt3 = 'image3', width = 'auto', height = 'auto', style = {}, className = '' }) => (
    <img src={food} alt={alt3} width={500} height={height} style={style} className={className} />
);

export { Img, Icon, Food }

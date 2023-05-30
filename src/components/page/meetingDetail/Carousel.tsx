import { Box } from '@components/box/Box';
import Slider from 'react-slick';
import { styled } from 'stitches.config';
import NextArrow from './NextArrow';
import 'slick-carousel/slick/slick.css';
import { ImageURLType } from '@api/meeting';

interface CarouselProps {
  imageList: ImageURLType[];
}

const Carousel = ({ imageList }: CarouselProps) => {
  const settings = {
    autoplay: true,
    prevArrow: <NextArrow className="prev" />,
    nextArrow: <NextArrow className="next" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
    ],
  };

  return (
    <SCarousel>
      <Slider {...settings}>
        {imageList.map(({ id, url }) => (
          <SImageWrapper key={id}>
            <img src={url} alt="" />
          </SImageWrapper>
        ))}
      </Slider>
    </SCarousel>
  );
};

export default Carousel;

const SCarousel = styled(Box, {
  '.slick-slider': {
    flexType: 'center',
    mt: '$60',
    mb: '$80',

    '@tablet': {
      mt: '0',
      mb: '$32',
      width: 'calc(100% + 40px)',
      height: '$256',
      marginLeft: '-20px',
      display: 'block',
    },
  },

  '.slick-list': {
    width: '100%',
    maxWidth: '$869',
    borderRadius: '14px',

    '@tablet': {
      borderRadius: '$0',
    },
  },

  '.slick-prev': {
    mr: '94px',
  },

  '.slick-next': {
    transform: 'rotate(180deg)',
    ml: '93px',
  },

  '.slick-dots': {
    position: 'relative',
    top: '-27px',
    width: 'fit-content',
    height: '$17',
    margin: '0 auto',
    padding: '$6 $7',
    boxSizing: 'border-box',
    background: '$black60_trans',
    borderRadius: '32px',
  },

  '.slick-dots li': {
    position: 'relative',
    top: '-14px',
    display: 'inline-block',
    width: 'fit-content',

    '& + &': {
      ml: '$4',
    },
  },

  '.slick-dots li button': {
    display: 'block',
    width: '$5',
    height: '$5',
    fontSize: '0',
    cursor: 'pointer',
  },

  '.slick-dots li button:before': {
    content: '',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '$5',
    height: '$5',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
  },

  '.slick-dots .slick-active button:before': {
    backgroundColor: '$white100',
  },
});

const SImageWrapper = styled(Box, {
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '$594',
    margin: '0 auto',

    '@tablet': {
      height: '$256',
    },
  },
});

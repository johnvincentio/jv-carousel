import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteCarousel from '../src/index';

React.initializeTouchEvents && React.initializeTouchEvents(true);
ReactDOM.render(
  <InfiniteCarousel
    dots
    paging
    scrollOnDevice
    showSides
    breakpoints={[
      {
        breakpoint: 500,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 3,
        },
      },
    ]}
    sideSize={0.1}
    sidesOpacity={0.5}
    slidesToScroll={4}
    slidesToShow={4}
    onNextClick={() => { console.log('onNextClick'); }}
    onPreviousClick={() => { console.log('onPreviousClick'); }}
  >
 	<div>
			<img alt="" src="https://via.placeholder.com/215x215?text=AAA" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=BBB" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=CCC" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=DDD" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=EEE" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=FFF" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=GGG" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=HHH" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=III" />
				</div>
				<div>
					<img alt="" src="https://via.placeholder.com/215x215?text=JJJ" />
				</div>
  </InfiniteCarousel>,
  document.getElementById('root'),
);

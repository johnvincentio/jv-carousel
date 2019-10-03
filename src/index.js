import React, {
  Component,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import {
  getElementWidth,
} from './common/helpers';

import styles from './components/InfiniteCarousel.css';

class InfiniteCarousel extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    arrows: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    dots: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    paging: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    pagingSeparator: PropTypes.string,
    lazyLoad: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    swipe: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    draggable: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    animationDuration: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    slidesToShow: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    slidesToScroll: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    slidesSpacing: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    autoCycle: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    cycleInterval: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    pauseOnHover: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    responsive: PropTypes.bool,
    breakpoints: PropTypes.arrayOf(PropTypes.object),
    placeholderImageSrc: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    nextArrow: PropTypes.element, // eslint-disable-line react/no-unused-prop-types
    prevArrow: PropTypes.element, // eslint-disable-line react/no-unused-prop-types
    scrollOnDevice: PropTypes.bool,
    showSides: PropTypes.bool,
    sidesOpacity: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    sideSize: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    incrementalSides: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types,
    onSlideChange: PropTypes.func,
    onNextClick: PropTypes.func,
    onPreviousClick: PropTypes.func,
  };
  static defaultProps = {
    children: [],
    arrows: true,
    dots: false,
    paging: false,
    lazyLoad: false,
    swipe: true,
    draggable: false,
    animationDuration: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesSpacing: 10,
    autoCycle: false,
    cycleInterval: 5000,
    pauseOnHover: true,
    responsive: true,
    breakpoints: [],
    placeholderImageSrc: '',
    pagingSeparator: '/',
    nextArrow: null,
    prevArrow: null,
    scrollOnDevice: false,
    showSides: false,
    sidesOpacity: 1,
    sideSize: 0.5,
    incrementalSides: false,
    onSlideChange: undefined,
    onNextClick: undefined,
    onPreviousClick: undefined,
  };

  constructor(props) {
    super(props);

    // initial state
    this.state = {
      currentIndex: 0,
      children: [],
      lazyLoadedList: [],
      visibleSlideList: [],
      childrenCount: 0,
      slidesCount: 0,
      slidesWidth: 1,
      singlePage: true,
      settings: {},
      autoCycleTimer: null,
      lowerBreakpoint: undefined,
      higherBreakpoint: undefined,
    };
  }

  componentDidMount() {
    this.init();
    this.setDimensions();
  }

  componentWillUnmount() {
    if (this.state.autoCycleTimer) {
      clearInterval(this.state.autoCycleTimer);
    }
  }

  getSideSize = (lowerBreakpoint, higherBreakpoint, currentScreenWidth) => {
    const { incrementalSides } = this.state.settings;

    if (lowerBreakpoint !== undefined && higherBreakpoint !== undefined && incrementalSides) {
      const maxPoint = higherBreakpoint - lowerBreakpoint;
      const currentPoint = currentScreenWidth - lowerBreakpoint;
      const sideSizePercetange = (currentPoint * 50) / maxPoint;

      return sideSizePercetange / 100;
    }

    return this.state.settings.sideSize;
  };

  setDimensions = () => {
    const { settings } = this.state;
    const currentScreenWidth = getScreenWidth();
    const sideSize = this.getSideSize(lowerBreakpoint, higherBreakpoint, currentScreenWidth);
    const childrenCount = Children.count(this.props.children);
    const slidesCount = Children.count(this.state.children);
    const frameWidth = getElementWidth(this.frame);
    const { showSides } = this.props;
    const slidesToShow = showSides ? settings.slidesToShow + (sideSize * 2) : settings.slidesToShow;
    const slidesWidth = (frameWidth / slidesToShow) - (settings.slidesSpacing * 2);
    const childrenLength = this.props.children.length;
    const activePage = Math.ceil(this.state.currentIndex / settings.slidesToShow);
    const countPages = Math.ceil(childrenLength / settings.slidesToShow);
    const slidePages = childrenLength > settings.slidesToShow ? countPages : 1;
    const singlePage = slidePages <= 1;

    let lazyLoadedList;
    let visibleSlideList;
    // if (singlePage || scrollOnDevice) {
    //   lazyLoadedList = this.state.children.map((child, index) => index);
    //   visibleSlideList = this.state.children.map((child, index) => index);
    // } else {
      lazyLoadedList = this.getLazyLoadedIndexes(this.props.children, this.state.currentIndex);
      visibleSlideList = this.getVisibleIndexes(this.props.children, this.state.currentIndex);
    // }

    this.setState({
      activePage,
      childrenCount,
      slidesCount,
      slidesWidth,
      slidePages,
      singlePage,
      lazyLoadedList,
      visibleSlideList,
      sideSize,
    });
  };

  getVisibleIndexes = (children, currentIndex) => {
    const visibleIndexes = [];
    let start;
    let limit;
    const { settings } = this.state;
    const showSidesSlide = settings.showSides ? 1 : 0;

    start = children.length + settings.slidesToShow + showSidesSlide;
    if (currentIndex === 0) {
      limit = (start + settings.slidesToShow) - 1;
      for (let index = start; index <= limit; index += 1) {
        visibleIndexes.push(index);
      }
    }

    start = 0 + showSidesSlide;
    const isAtLastPage = currentIndex === children.length - settings.slidesToShow;

    if (isAtLastPage) {
      limit = (start + settings.slidesToShow) - 1;
      for (let index = start; index <= limit; index += 1) {
        visibleIndexes.push(index);
      }
    }

    start = currentIndex + this.state.settings.slidesToShow + showSidesSlide;
    limit = start + (this.state.settings.slidesToShow - 1);
    for (let index = start; index <= limit; index += 1) {
      visibleIndexes.push(index);
    }

    return visibleIndexes;
  };

  getLazyLoadedIndexes = (children, currentIndex) => {
    const { lazyLoadedList } = this.state;
    let start;
    let limit;
    const { settings } = this.state;
    const showSidesSlide = settings.showSides ? 1 : 0;

    start = children.length + settings.slidesToShow + showSidesSlide;
    if (currentIndex === 0 && this.state.lazyLoadedList.indexOf(start) < 0) {
      limit = (start + settings.slidesToShow + showSidesSlide) - 1;
      for (let index = start; index <= limit; index += 1) {
        lazyLoadedList.push(index);
      }
    }

    start = 0;
    const isAtLastPage = currentIndex === children.length - settings.slidesToShow;
    const notLazyLoaded = lazyLoadedList.indexOf(start) < 0;

    if (isAtLastPage && notLazyLoaded) {
      limit = (start + settings.slidesToShow + showSidesSlide) - 1;
      for (let index = start; index <= limit; index += 1) {
        lazyLoadedList.push(index);
      }
    }

    start = currentIndex + settings.slidesToShow + showSidesSlide;
    limit = start + (settings.slidesToShow - 1);

    if (this.state.settings.showSides) {
      start -= 1;
      limit += 1;
    }

    for (let index = start; index <= limit; index += 1) {
      if (this.state.lazyLoadedList.indexOf(index) < 0) {
        lazyLoadedList.push(index);
      }
    }

    return lazyLoadedList;
  };

  getChildrenList = (children, slidesToShow) => {
    if (!Array.isArray(children)) {
      return [children];
    }

    if (children.length > slidesToShow && this.props.showSides) {
      return [
        ...(children.slice(children.length - slidesToShow - 1, children.length)),
        ...children,
        ...(children.slice(0, slidesToShow + 1)),
      ];
    }

    if (children.length > slidesToShow) {
      return [
        ...(children.slice(children.length - slidesToShow, children.length)),
        ...children,
        ...(children.slice(0, slidesToShow)),
      ];
    }

    return children;
  };

  getTargetIndex = (index, slidesToScroll) => {
    let targetIndex = index;
    const childrenReminder = this.state.childrenCount % slidesToScroll;
    if (index < 0) {
      if (this.state.currentIndex === 0) {
        targetIndex = this.state.childrenCount - slidesToScroll;
      } else {
        targetIndex = 0;
      }
    } else if (index >= this.state.childrenCount) {
      if (childrenReminder !== 0) {
        targetIndex = 0;
      } else {
        targetIndex = index - this.state.childrenCount;
      }
    } else if (childrenReminder !== 0 && index === (this.state.childrenCount - childrenReminder)) {
      targetIndex = index - (slidesToScroll - childrenReminder);
    } else {
      targetIndex = index;
    }

    return targetIndex;
  };

  onWindowResized = () => {
    this.setDimensions();
  };

  onMouseEnter = () => {
    if (this.state.settings.autoCycle && this.state.settings.pauseOnHover) {
      this.pauseAutoCycle();
    }
  };

  onMouseOver = () => {
    if (this.state.settings.autoCycle && this.state.settings.pauseOnHover) {
      this.pauseAutoCycle();
    }
  };

  onMouseLeave = () => {
    if (this.state.settings.autoCycle && this.state.settings.pauseOnHover) {
      this.playAutoCycle();
    }
  };

  getTrackStyles = () => {
    const { settings } = this.state;
    let trackWidth = (this.state.slidesWidth + (settings.slidesSpacing * 2));
    trackWidth *= (this.state.slidesCount + (settings.slidesToShow * 2));
    const totalSlideWidth = this.state.slidesWidth + (settings.slidesSpacing * 2);
    const showSidesSlide = settings.showSides ? 1 : 0;
    const initialTrackPostion = totalSlideWidth * (settings.slidesToShow + showSidesSlide);
    const transition = this.state.animating ? `transform ${settings.animationDuration}ms ease` : '';
    const slidePosition = totalSlideWidth * this.state.currentIndex;
    let trackPosition = initialTrackPostion + slidePosition;
    const sideWidth = totalSlideWidth * this.state.sideSize;

    if (settings.showSides) {
      trackPosition -= sideWidth;
    }

    return {
      position: 'relative',
      display: 'block',
      width: !this.state.singlePage ? trackWidth : '100%',
      height: 'auto',
      padding: 0,
      transition,
      transform: !this.state.singlePage ? `translate(${-trackPosition}px, 0px)` : 'none',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      marginLeft: this.state.singlePage && settings.showSides ? `${sideWidth}px` : '0px',
    };
  };

  getScrollTrackStyles = {
    clear: 'both',
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 'auto',
    padding: 0,
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
  };

  getSlideStyles = (isVisible) => {
    const { slidesWidth } = this.state;
    const float = 'left';
    const display = 'inline-block';
    const opacity = isVisible ? '1' : this.state.settings.sidesOpacity;

    return {
      position: 'relative',
      float,
      display,
      width: !Number.isNaN(slidesWidth) ? slidesWidth : 1,
      height: 'auto',
      margin: `0 ${this.state.settings.slidesSpacing}px`,
      opacity,
    };
  };

  getFormatedChildren = (children, lazyLoadedList, visibleSlideList) =>
    Children.map(children, (child, index) => {
      const { settings } = this.state;
      const isVisible = visibleSlideList.indexOf(index) >= 0;

      if (!settings.lazyLoad || lazyLoadedList.indexOf(index) >= 0) {
        return (
          <li
            className={styles.InfiniteCarouselSlide}
            key={index}
            style={this.getSlideStyles(isVisible)}
          >
            {child}
          </li>
        );
      }
      return (
        <li
          className={styles.InfiniteCarouselSlide}
          key={index}
          style={this.getSlideStyles(isVisible)}
        >
          <img alt='placeholder' src={settings.placeholderImageSrc} />
        </li>
      );
    });

  autoCycle = () => {
    const { settings } = this.state;
    const targetIndex = this.state.currentIndex + settings.slidesToScroll;
    const currentIndex = this.getTargetIndex(targetIndex, settings.slidesToScroll);
    this.handleTrack(targetIndex, currentIndex);
  };

  playAutoCycle = () => {
    if (this.state.settings.autoCycle) {
      const autoCycleTimer = setInterval(this.autoCycle, this.state.settings.cycleInterval);
      this.setState({
        autoCycleTimer,
      });
    }
  };

  pauseAutoCycle = () => {
    if (this.state.autoCycleTimer) {
      clearInterval(this.state.autoCycleTimer);
      this.setState({
        autoCycleTimer: null,
      });
    }
  };

  handleTrack = (targetIndex, currentIndex) => {
    const { settings } = this.state;
    const activePage = Math.ceil(currentIndex / settings.slidesToShow);
    const lazyLoadedList = this.getLazyLoadedIndexes(this.props.children, currentIndex);
    const visibleSlideList = this.getVisibleIndexes(this.props.children, currentIndex);

    const callback = () => {
      setTimeout(() => {
        this.setState({
          currentIndex,
          animating: false,
          dragging: false,
        });
      }, settings.animationDuration);
    };

    const stopAnimation = () => {
      setTimeout(() => {
        this.setState({
          animating: false,
          dragging: false,
        });
      }, settings.animationDuration);
    };

    if (targetIndex < 0) {
      this.setState({
        currentIndex: targetIndex,
        activePage,
        animating: true,
        lazyLoadedList,
        visibleSlideList,
      }, callback);
    } else if (targetIndex >= this.props.children.length) {
      this.setState({
        currentIndex: targetIndex,
        activePage,
        animating: true,
        lazyLoadedList,
        visibleSlideList,
      }, callback);
    } else {
      this.setState({
        currentIndex,
        activePage,
        animating: true,
        lazyLoadedList,
        visibleSlideList,
        dragging: false,
      }, stopAnimation);
    }

    if (this.props.onSlideChange) {
      this.props.onSlideChange(activePage);
    }
  };

  moveToNext = (event) => {
    event.preventDefault();
    if (this.props.onNextClick) {
      this.props.onNextClick(event);
    }
    if (this.state.animating) {
      return;
    }
    if (this.state.settings.autoCycle && this.state.autoCycleTimer) {
      clearInterval(this.state.autoCycleTimer);
      this.setState({
        autoCycleTimer: null,
      });
    }
    const { settings } = this.state;
    const targetIndex = this.state.currentIndex + settings.slidesToScroll;
    const currentIndex = this.getTargetIndex(targetIndex, settings.slidesToScroll);
    this.handleTrack(targetIndex, currentIndex);
    if (this.state.settings.autoCycle) {
      this.playAutoCycle();
    }
  };

  moveToPrevious = (event) => {
    event.preventDefault();
    if (this.props.onPreviousClick) {
      this.props.onPreviousClick(event);
    }
    if (this.state.animating) {
      return;
    }
    if (this.state.settings.autoCycle && this.state.autoCycleTimer) {
      clearInterval(this.state.autoCycleTimer);
      this.setState({
        autoCycleTimer: null,
      });
    }
    const { settings } = this.state;
    let targetIndex = this.state.currentIndex - settings.slidesToScroll;
    const currentIndex = this.getTargetIndex(targetIndex, settings.slidesToScroll);
    if (targetIndex < 0 && this.state.currentIndex !== 0) {
      targetIndex = 0;
    }
    this.handleTrack(targetIndex, currentIndex);
    if (this.state.settings.autoCycle) {
      this.playAutoCycle();
    }
  };

  init = () => {
    const children = this.getChildrenList(this.props.children, this.props.slidesToShow);
    let settings;
      settings = Object.assign({}, this.defaultProps, this.props);

    this.setState({
      children,
      settings,
    }, () => {
      this.playAutoCycle();
    });
  };

  storeFrameRef = (f) => {
    if (f !== null) {
      this.frame = f;
    }
  };

  render() {
    const { children, lazyLoadedList, visibleSlideList } = this.state;
    const formattedChildren = this.getFormatedChildren(children, lazyLoadedList, visibleSlideList);
    let trackStyles;
    let trackClassName;

    trackStyles = this.getTrackStyles();
    trackClassName = '';

    // const disableSwipeEvents = this.props.scrollOnDevice && isTouchDevice();

    return (
      <div
        className={styles.InfiniteCarousel}
        onFocus={this.onMouseOver}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseOver={this.onMouseOver}
      >
        <div
          className={styles.InfiniteCarouselFrame}
          ref={this.storeFrameRef}
        >
          <ul
            className={trackClassName}
            style={trackStyles}
            // onMouseDown={!disableSwipeEvents ? this.onSwipeStart : null}
            // onMouseLeave={this.state.dragging || !disableSwipeEvents ? this.onSwipeEnd : null}
            // onMouseMove={this.state.dragging || !disableSwipeEvents ? this.onSwipeMove : null}
            // onMouseUp={!disableSwipeEvents ? this.onSwipeEnd : null}
            // onTouchCancel={this.state.dragging || !disableSwipeEvents ? this.onSwipeEnd : null}
            // onTouchEnd={!disableSwipeEvents ? this.onSwipeEnd : null}
            // onTouchMove={this.state.dragging || !disableSwipeEvents ? this.onSwipeMove : null}
            // onTouchStart={!disableSwipeEvents ? this.onSwipeStart : null}
          >
            {formattedChildren}
          </ul>
        </div>
      </div>
    );
  }
}

export default InfiniteCarousel;

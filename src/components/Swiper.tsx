import React from 'react'
// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  A11y,
  SwiperOptions
} from 'swiper'

import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Mousewheel, A11y])

interface SwiperProps extends SwiperOptions {
  children?: React.ReactNode
}

export { SwiperSlide }

export default function Swiper({
  children,
  ...props
}: SwiperProps): React.ReactElement {
  return (
    <SwiperComponent
      {...props}
      // spaceBetween={50}
      // slidesPerView="auto"
      // freeMode
      // direction="vertical"
      // mousewheel
      // navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={swiper => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {children}
    </SwiperComponent>
  )
}

// @flow

import * as React from 'react'
import typeof DefaultViewSlider from 'react-view-slider'
import ViewSlider from 'react-view-slider/lib/withTransitionContext'
import {createDrilldown} from './index'

// ugly workaround for limitations of how Flow handles defaultProps
const ViewSliderWrapper = (props: React.ElementConfig<DefaultViewSlider>) => <ViewSlider {...props} />

export default createDrilldown({
  ViewSlider: ViewSliderWrapper,
})


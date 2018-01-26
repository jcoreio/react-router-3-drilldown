// @flow

import * as React from 'react'
import ViewSlider from 'react-view-slider/lib/withTransitionContext'
import {createDrilldown} from './index'

// ugly workaround for limitations of how Flow handles defaultProps
const ViewSliderWrapper = (props: React.ElementConfig<typeof ViewSlider>) => <ViewSlider {...props} />

export default createDrilldown({
  ViewSlider: ViewSliderWrapper,
})


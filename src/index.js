/* @flow */
/* eslint-env shared-node-browser */

import * as React from 'react'
import DefaultViewSlider from 'react-view-slider'
import type {ViewProps} from 'react-view-slider'
import type {Prefixer} from 'inline-style-prefixer'

type Side = 'left' | 'right'
type TransitionState = 'in' | 'out' | 'entering' | 'leaving'

export type ChildProps = {
  side: Side,
  transitionState: TransitionState,
  children: any,
  style: Object,
}

type Route = {
  indexRoute?: Route,
  path?: string,
}

export type Props = {
  route: Route,
  routes: Array<Route>,
  children?: any,
  animateHeight?: boolean,
  transitionDuration?: number,
  transitionTimingFunction?: string,
  prefixer?: Prefixer,
  fillParent?: boolean,
  className?: string,
  style?: Object,
  viewportClassName?: string,
  viewportStyle?: Object,
}

type State = {
  children: Array<?React.Node>,
}

function getActiveView({route, routes}: Props): number {
  const routeIndex = routes.indexOf(route)
  for (let i = routeIndex + 1; i < routes.length; i++) {
    if (routes[i].path) return 1
  }
  return 0
}

export function createDrilldown(config: {
  ViewSlider?: React.ComponentType<React.ElementConfig<typeof DefaultViewSlider>>,
} = {}): React.ComponentType<Props> {
  return class Drilldown extends React.Component<Props, State> {
    state: State

    constructor(props: Props) {
      super(props)
      const children: Array<?React.Node> = [null, null]
      children[getActiveView(props)] = props.children
      this.state = {children}
    }

    componentWillReceiveProps(nextProps: Props) {
      const {children} = nextProps
      const viewIndex = getActiveView(nextProps)
      if (this.state.children[viewIndex] !== children) {
        const newChildren = [...this.state.children]
        newChildren[viewIndex] = children
        this.setState({children: newChildren})
      }
    }

    renderView = ({index, key, ref, style, transitionState}: ViewProps): React.Node => (
      <div key={key} ref={ref} style={style} data-transition-state={transitionState}>
        {this.state.children[index]}
      </div>
    )

    render(): React.Node {
      const {
        animateHeight, transitionDuration, transitionTimingFunction, prefixer, fillParent, className, style,
        viewportClassName, viewportStyle,
      } = this.props

      const ViewSlider = config.ViewSlider || DefaultViewSlider

      return (
        <ViewSlider
            numViews={2}
            activeView={getActiveView(this.props)}
            renderView={this.renderView}
            animateHeight={animateHeight}
            transitionDuration={transitionDuration}
            transitionTimingFunction={transitionTimingFunction}
            prefixer={prefixer}
            fillParent={fillParent}
            className={className}
            style={style}
            viewportClassName={viewportClassName}
            viewportStyle={viewportStyle}
        />
      )
    }
  }
}

export default createDrilldown()


// @flow
/* eslint-env browser */

import React from 'react'
import {render} from 'react-dom'
import Demo from './Demo'

const root = document.getElementById('root')
if (!root) throw new Error("expected to find a root element")

render(<Demo />, root)


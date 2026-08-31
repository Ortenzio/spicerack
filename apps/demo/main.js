import { createSpicerack } from '@ozio/spicerack';
import "./style.css";

const config = [
  { 
    type: 'folder',
    label: 'Strings',
    config: [
      { key: 'name', value: 'Nicholas', type: 'text', label: 'Name' },
      { key: 'message', value: 'It was that impossible thing...', type: 'textarea', label: 'Message', rows: 3 },
    ]
  },
  { 
    type: 'folder',
    label: 'Numbers', 
    open: true,
    config: [
      { key: 'points', value: 32, type: 'range', label: 'Points', step: 1 },
      { key: 'rebounds', value: 10, type: 'number', label: 'Rebounds' },
    ]
  },
  { 
    type: 'folder',
    label: 'Flags', 
    open: false,
    config: [
      { key: 'shotMade', value: true, type: 'boolean', label: 'Made Shots' },
      { key: 'starter', value: true, type: 'toggle', label: 'Starter' },
      { key: 'isRookie', value: false, type: 'switch', label: 'Is Rookie' },
    ]
  },
  {
    key: 'location', 
    type: 'radio',
    value: 'Both', 
    label: 'Location',
    items: ['Both', 'Home', 'Away']
  },
  {
    key: 'conference', 
    type: 'list', 
    value: '',
    label: 'Conference',
    options: [
      { value: '', label: 'All Conferences', },
      { value: 'east', label: 'Eastern' },
      { value: 'west', label: 'Western' }
    ]
  },
  {
    key: 'division', 
    type: 'list', 
    value: 'Atlantic', 
    label: 'Division',
    options: [
      'Atlantic', 
      'Central', 
      'Southeast',
      'Northwest',
      'Pacific',
      'Southwest'
    ]
  },       
  { 
    type: 'button', 
    label: 'Click Me'
  }
];

const gui = createSpicerack(config, { title: 'Spicerack Demo' })

gui.mount("#spicerack")

/**
 * 
 */
const output = document.querySelector("#output")

const render = function () {
  output.textContent = JSON.stringify(gui.json(), null, 2)
}

for (const key of Object.keys(gui.model)) {
  gui.model[key].on('change', render)
}

render();
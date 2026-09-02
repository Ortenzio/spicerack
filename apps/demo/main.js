import { createSpicerack } from '@ozio/spicerack';
import "./style.css";

const config = [
  { 
    type: 'folder',
    label: 'Strings',
    config: [
      { key: 'name', value: 'Nicholas', type: 'text', label: 'Name', onChange: render },
      { key: 'message', value: 'It was that impossible thing...', type: 'textarea', label: 'Message', rows: 3, onChange: render },
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
    options: ['Both', 'Home', 'Away']
  },
  {
    key: 'align', 
    type: 'radio',
    value: 'center center', 
    label: 'Align',
    cols: 3,
    options: [
      { value: 'top left', label: '↖' },
      { value: 'top center', label: '↑' },
      { value: 'top right', label: '↗' },
      { value: 'center left', label: '←' },
      { value: 'center center', label: '•' },
      { value: 'center right', label: '→' },
      { value: 'bottom left', label: '↙' },
      { value: 'bottom center', label: '↓' },
      { value: 'bottom right', label: '↘' },
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

function render (a, b, c) {
  output.textContent = JSON.stringify(gui.json(), null, 2)
}

for (const key of Object.keys(gui.model)) {
  gui.model[key].on('change', render)
}

console.log(gui.version);

render();
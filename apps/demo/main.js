import { createSpicerack } from '@ozio/spicerack';
import "./style.css";

const config = [
  {
    key: 'l',
    type: 'range',
    label: 'Lightness',
    value: 50,
    min: 0,
    max: 100,
    step: 0.1
  },
  {
    key: 'a',
    type: 'range',
    label: 'Green ↔ Red',
    value: 0,
    min: -0.4,
    max: 0.4,
    step: .01
  },
  {
    key: 'b',
    type: 'range',
    label: 'Blue ↔ Yellow',
    value: 0,
    min: -0.4,
    max: 0.4,
    step: .01
  },
  {
    key: 'alpha',
    type: 'range',
    label: 'Alpha',
    value: 0,
    min: 0,
    max: 1,
    step: .01
  }
  // { 
  //   type: 'folder',
  //   label: 'Strings',
  //   config: [
  //     { key: 'name', value: 'Nicholas', type: 'text', label: 'Name', onChange: render },
  //     { key: 'message', value: 'It was that impossible thing...', type: 'textarea', label: 'Message', rows: 3, onChange: render },
  //   ]
  // },
  // { 
  //   type: 'folder',
  //   label: 'Numbers', 
  //   open: true,
  //   config: [
  //     { key: 'points', value: 32, type: 'range', label: 'Points', step: 1 },
  //     { key: 'rebounds', value: 10, type: 'number', label: 'Rebounds' },
  //   ]
  // },
  // { 
  //   type: 'folder',
  //   label: 'Flags', 
  //   open: false,
  //   config: [
  //     { key: 'shotMade', value: true, type: 'boolean', label: 'Made Shots' },
  //     { key: 'starter', value: true, type: 'toggle', label: 'Starter' },
  //     { key: 'isRookie', value: false, type: 'switch', label: 'Is Rookie' },
  //   ]
  // },
  // {
  //   type: 'password',
  //   key: 'pass',
  //   label: 'Password',
  //   value: 'hacker',
  //   show: false
  // },
  // {
  //   type: 'group',
  //   label: 'Groups',
  //   flow: 'row',
  //   cols: 4,
  //   config: [
  //     { type: 'button', label: 'A' },
  //     { type: 'button', label: 'B' },
  //     { type: 'button', label: 'C' },
  //     { type: 'button', label: 'D' },
  //     { type: 'button', label: 'E' },
  //     { type: 'button', label: 'F' },
  //   ]
  // },
  // {
  //   key: 'location', 
  //   type: 'radio',
  //   value: 'Both', 
  //   label: 'Location',
  //   options: ['Both', 'Home', 'Away']
  // },
  // {
  //   key: 'align', 
  //   type: 'radio',
  //   value: 'center center', 
  //   label: 'Align',
  //   cols: 3,
  //   options: [
  //     { value: 'top left', label: '↖' },
  //     { value: 'top center', label: '↑' },
  //     { value: 'top right', label: '↗' },
  //     { value: 'center left', label: '←' },
  //     { value: 'center center', label: '•' },
  //     { value: 'center right', label: '→' },
  //     { value: 'bottom left', label: '↙' },
  //     { value: 'bottom center', label: '↓' },
  //     { value: 'bottom right', label: '↘' },
  //   ]
  // },
  // {
  //   key: 'division', 
  //   type: 'list', 
  //   value: 'Atlantic', 
  //   label: 'Division',
  //   options: [
  //     'Atlantic', 
  //     'Central', 
  //     'Southeast',
  //     'Northwest',
  //     'Pacific',
  //     'Southwest'
  //   ]
  // },
  // { type: 'button', label: 'Click Me' }
];

const gui = createSpicerack(config, { 
  title: 'Spicerack Demo',
  tokens: {
    bgColorAccent: 'light-dark(#00749E, #1B537B)',
    bgColorMuted: 'light-dark(#00749E, #1B537B)',
    bgColorActive: 'light-dark(#00749E, #1B537B)',
  }
})

gui.mount("#spicerack")

/** @type {HTMLElement} */
const output = document.querySelector("#output")

function render () {
  const color = `oklab(${gui.model.l.value}% ${gui.model.a.value} ${gui.model.b.value} / ${gui.model.alpha.value})`
  output.textContent = JSON.stringify(gui.json(), null, 2);
  output.style.backgroundColor = color;
}

for (const key of Object.keys(gui.model)) {
  gui.model[key].on('change', render)
}

console.log(gui.version);

render();
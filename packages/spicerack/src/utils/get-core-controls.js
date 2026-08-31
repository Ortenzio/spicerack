import * as coreControls from '@ozio/spicerack-controls';

export function getCoreControls () {
  return ({
    'boolean': coreControls.BooleanControl,
    'button': coreControls.ButtonControl,
    'divider': coreControls.DividerControl,
    'folder': coreControls.FolderControl,
    'list': coreControls.ListControl,
    'number': coreControls.NumberControl,
    'range': coreControls.RangeControl,
    'switch': coreControls.SwitchControl,
    'text': coreControls.TextControl,
    'textarea': coreControls.TextareaControl,
    'toggle': coreControls.ToggleControl
  });
}

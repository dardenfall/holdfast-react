const keyPressed = key => ({
    type: 'KEY_PRESSED',
    key
  });

const enteringVillageSelected = buttonSelected => ({
  type: 'ENTERING_VILLAGE_SELECTED',
  buttonSelected
});

const leavingVillageSelected = buttonSelected => ({
  type: 'LEAVING_VILLAGE_SELECTED',
  buttonSelected
});

export{
  keyPressed,
  enteringVillageSelected,
  leavingVillageSelected
}
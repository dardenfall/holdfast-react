const keyPressed = key => ({
    type: 'KEY_PRESSED',
    key
  });

const enteringVillageSelected = proceed => ({
  type: 'ENTERING_VILLAGE_SELECTED',
  proceed
});

const leavingVillageSelected = proceed => ({
  type: 'LEAVING_VILLAGE_SELECTED',
  proceed
});

export{
  keyPressed,
  enteringVillageSelected,
  leavingVillageSelected
}
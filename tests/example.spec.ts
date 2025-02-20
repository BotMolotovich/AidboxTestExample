import {test} from '../fixtures/base';

test('test', async ({formPage}) => {
  await formPage.openUiBuilder('https://testcloud.aidbox.app/ui/sdc');
  await formPage.createNewFormInUiBuilder()
  await formPage.createDecimalItem('1.1','Weight (kg)',formPage.formWeightName);
  await formPage.createDecimalItem('1.2','Height (cm)',formPage.formHeightName);
  await formPage.createDecimalItem('1.3','BMI',formPage.formBmiName);
  await formPage.makeFieldCalculateBmi();
  await formPage.fillFieldsAndCheckBmi();
});

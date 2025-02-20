import { expect, Locator, Page } from '@playwright/test'
import BasePage from './base.page'

export class FormPage extends BasePage {
    readonly formTemplatesHeader: Locator;
    readonly createTemplateButton: Locator;
    readonly createInUiBuilderButton: Locator;
    readonly formHeader:Locator;
    readonly addNewItemButton: Locator;
    readonly decimalTypeButton: Locator;
    readonly linkIdInput:Locator;
    readonly itemTextInput: Locator;
    readonly formEmptyArea: Locator
    readonly formWeightName:Locator;
    readonly formHeightName:Locator;
    readonly formBmiName: Locator;
    readonly itemExpressionInput: Locator;
    readonly formWeightInput:Locator;
    readonly formHeightInput:Locator;
    readonly formBmiInput: Locator;


    public constructor(page){
        super(page)
        this.formTemplatesHeader = page.getByText('Form Templates');
        this.createTemplateButton = page.getByRole('button', { name: 'Create template' });
        this.createInUiBuilderButton = page.getByText('Create in UI Builder');
        this.formHeader = page.locator('#aidbox-forms-renderer').contentFrame().locator('#form-header')
        this.addNewItemButton = page.getByRole('button', { name: '+', exact: true });
        this.decimalTypeButton = page.getByRole('button', { name: 'Decimal' });
        this.linkIdInput = page.getByRole('textbox', { name: 'Link Id' });
        this.itemTextInput = page.getByRole('textbox', { name: 'Text' });
        this.formWeightName = this.findNameFromForm('Weight (kg)');
        this.formHeightName = this.findNameFromForm('Height (cm)');
        this.formBmiName = this.findNameFromForm('BMI');
        this.formEmptyArea = page.locator('#aidbox-forms-renderer').contentFrame().locator('#aidbox-form');
        this.itemExpressionInput = page.getByRole('textbox').filter({ hasText: 'Enter FHIRPath expression' });
        this.formWeightInput = this.findInputFromForm('Weight (kg)');
        this.formHeightInput = this.findInputFromForm('Height (cm)');
        this.formBmiInput = this.findInputFromForm('BMI');
    }
    

    async openUiBuilder(url: string) {
        await this.goto(url)
        await expect(this.formTemplatesHeader).toBeVisible();
    }
    async createNewFormInUiBuilder() {
        await this.createTemplateButton.click();
        await this.createInUiBuilderButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.formHeader).toContainText('New form');
    }
    async createDecimalItem(linkId:string, itemText:string, locator:Locator) {
        await this.addNewItemButton.click();
        await this.decimalTypeButton.click();
        await this.linkIdInput.click();
        await this.linkIdInput.fill(linkId);
        await this.itemTextInput.click();
        await this.itemTextInput.fill(itemText);
        await this.formEmptyArea.click();
        await expect(locator).toContainText(itemText)
    }
    async makeFieldCalculateBmi(){
        await this.formBmiName.click();
        await this.itemExpressionInput.fill('(%resource.repeat(item).where(linkId=\'1.1\').answer.value / (%resource.repeat(item).where(linkId=\'1.2\').answer.value / 100).power(2)).round(1)');
    }
    async fillFieldsAndCheckBmi(){
        await this.formWeightInput.fill('81');
        await this.formHeightInput.fill('180');
        await this.formBmiInput.click();
        await expect(this.formBmiInput).toHaveValue('25');
    }
}
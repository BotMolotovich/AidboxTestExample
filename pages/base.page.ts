import {Page} from '@playwright/test'

export default abstract class BasePage {
readonly page: Page


public constructor(page:Page){
    this.page = page
}
async goto(url:string) {
    await this.page.goto(url);

}
findInputFromForm(inputName:string){
    return this.page.locator('#aidbox-forms-renderer').contentFrame().getByRole('spinbutton', { name: `${inputName}` });
 }
findNameFromForm(name:string){
    return this.page.locator('#aidbox-forms-renderer').contentFrame().locator('label').filter({ hasText: `${name}` });
} 
}
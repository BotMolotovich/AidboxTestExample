import { test as base } from '@playwright/test';
import { FormPage } from '../pages/form.page';

export const test = base.extend<{ formPage: FormPage }>
  ({
    formPage: async ({ page }, use) => {
      await use(new FormPage(page));
    },
  });
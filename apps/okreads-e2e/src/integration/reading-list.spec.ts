import { $, $$, ExpectedConditions, browser } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  describe('When: I use the mark the book as finished', () => {
    it('Then: I should see the finished status and finished date', async () => {
      await browser.get('/');
      await browser.wait(
        ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
      );

      const form = await $('form');
      const input = await $('input[type="search"]');
      await input.sendKeys('javascript');
      await form.submit();

      const bookItems = $$('[data-testing="book-item"]');
      const itemsCount = await bookItems.count();
      const count = itemsCount > 2 ? 2 : itemsCount;
      for (let i = 0; i < count; i++) {
        const bookItem = await bookItems.get(i);
        const addBtn = await bookItem.$('button[data-testing="want-to-read"]');
        await addBtn.click();
      }

      const readingListToggle = await $('[data-testing="toggle-reading-list"]');
      await readingListToggle.click();

      const readingListItems = $$('[data-testing="reading-list-item"]');
      const readingListItem = await readingListItems.get(0);
      const finishBtn = await readingListItem.$('button[data-testing="finish-book-btn"]');
      await finishBtn.click();

      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('[data-testing="finish-label"]'),
          'Finished'
        )
      );
    });
  });
});

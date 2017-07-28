import { MytodoTestPage } from './app.po';

describe('mytodo-test App', () => {
  let page: MytodoTestPage;

  beforeEach(() => {
    page = new MytodoTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

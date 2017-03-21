import { LorabikeFrontendPage } from './app.po';

describe('lorabike-frontend App', () => {
  let page: LorabikeFrontendPage;

  beforeEach(() => {
    page = new LorabikeFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

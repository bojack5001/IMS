import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating to http://localhost:5173...');
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    console.log('Navigation complete. Waiting 2 seconds for any React errors...');
    await new Promise(r => setTimeout(r, 2000));
  } catch (err) {
    console.log('Navigation failed:', err.message);
  }
  
  await browser.close();
})();

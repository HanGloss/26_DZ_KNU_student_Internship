/**
 * 5개 페이지를 자동으로 캡처해 screenshots/ 에 저장.
 * 사용법: npm run dev (별도 터미널) → node scripts/screenshot.js
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const BASE = 'http://localhost:5173';

const SHOTS = [
  { name: '01-login',         path: '/login',       prep: null },
  { name: '02-merge-notice',  path: '/login',       prep: 'loginMerge' },
  { name: '03-terms',         path: '/login',       prep: 'goTerms' },
  { name: '04-2fa',           path: '/login',       prep: 'go2FA' },
  { name: '05-main',          path: '/login',       prep: 'goMain' },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/google/chrome/chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  for (const shot of SHOTS) {
    const page = await ctx.newPage();
    await page.goto(`${BASE}${shot.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    if (shot.prep === 'loginMerge') {
      await page.fill('input[type="email"]', 'merge@example.com');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/mergeNotice');
      await page.waitForTimeout(400);
    } else if (shot.prep === 'goTerms') {
      await page.fill('input[type="email"]', 'merge@example.com');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/mergeNotice');
      await page.waitForTimeout(300);
      await page.getByText('통합하기').click();
      await page.waitForURL('**/terms');
      await page.waitForTimeout(400);
    } else if (shot.prep === 'go2FA') {
      await page.click('button[type="submit"]');
      await page.waitForURL('**/twoFactor');
      await page.waitForTimeout(400);
    } else if (shot.prep === 'goMain') {
      await page.click('button[type="submit"]');
      await page.waitForURL('**/twoFactor');
      await page.waitForTimeout(300);
      await page.fill('input[inputmode="numeric"]', '123456');
      await page.getByText('인증하기').click();
      await page.waitForURL('**/main');
      await page.waitForTimeout(800); // 추천 로딩 끝나길
    }

    const out = path.join(ROOT, 'screenshots', `${shot.name}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`✓ ${shot.name}.png`);
    await page.close();
  }

  await browser.close();
  console.log('done');
})();

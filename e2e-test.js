const { chromium } = require('playwright');

const users = [
  { email: 'admin@gmail.com', password: 'admin', role: 'ADMIN', expectedUrl: '/adminprofile' },
  { email: 'raju@gmail.com', password: 'raju', role: 'DOCTOR', expectedUrl: '/prescriptions' },
  { email: 'child@gmail.com', password: 'child', role: 'PATIENT', expectedUrl: '/patientprofile' },
  { email: 'pha@gmail.com', password: 'pha', role: 'PHARMACIST', expectedUrl: '/medicine-bill-list' },
  { email: 'recep@gmail.com', password: 'recep', role: 'RECEPTIONIST', expectedUrl: '/receptionist-profile' },
  { email: 'rblannk@gmail.com', password: 'rblannk', role: 'LABORATORIST', expectedUrl: '/tests' }
];

async function testLogin() {
  const browser = await chromium.launch();
  let passCount = 0;
  let failCount = 0;

  for (const user of users) {
    try {
      const context = await browser.newContext();
      const page = await context.newPage();

      console.log(`\n🧪 Testing ${user.role} (${user.email})...`);
      
      // Navigate to login
      await page.goto('http://localhost/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      // Enter credentials
      await page.fill('input[type="email"]', user.email);
      await page.fill('input[type="password"]', user.password);
      
      // Click login
      await page.click('button:has-text("Login")');
      
      // Wait for navigation and check URL
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 });
      const currentUrl = page.url();
      
      if (currentUrl.includes(user.expectedUrl)) {
        console.log(`✅ ${user.role}: SUCCESS - Navigated to ${currentUrl}`);
        passCount++;
      } else {
        console.log(`❌ ${user.role}: FAILED - Expected ${user.expectedUrl}, got ${currentUrl}`);
        failCount++;
      }

      // Check for errors in console
      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.log(`   ⚠️  Console error: ${msg.text()}`);
        }
      });

      await context.close();
    } catch (error) {
      console.log(`❌ ${user.role}: ERROR - ${error.message}`);
      failCount++;
    }
  }

  await browser.close();

  console.log(`\n\n📊 TEST SUMMARY`);
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`Total: ${passCount + failCount}`);
  
  process.exit(failCount > 0 ? 1 : 0);
}

testLogin().catch(console.error);


const { test, expect } = require('@playwright/test');

test.describe('Critical User Journeys', () => {
  test('Complete audio recording workflow', async ({ page }) => {
    // Navigate to application
    await page.goto('/');
    
    // Authenticate user
    await page.fill('[data-testid="email-input"]', 'doctor@hospital.com');
    await page.fill('[data-testid="password-input"]', 'healthcare123');
    await page.click('[data-testid="login-button"]');
    
    // Wait for dashboard
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    
    // Start audio recording
    await page.click('[data-testid="record-button"]');
    await expect(page.locator('[data-testid="recording-indicator"]')).toBeVisible();
    
    // Stop recording after short duration
    await page.waitForTimeout(2000);
    await page.click('[data-testid="stop-button"]');
    
    // Verify upload progress
    await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();
    
    // Wait for processing completion
    await expect(page.locator('[data-testid="processing-complete"]')).toBeVisible({ timeout: 30000 });
  });

  test('Network failure recovery', async ({ page, context }) => {
    await page.goto('/');
    
    // Authenticate
    await page.fill('[data-testid="email-input"]', 'doctor@hospital.com');
    await page.fill('[data-testid="password-input"]', 'healthcare123');
    await page.click('[data-testid="login-button"]');
    
    // Start recording
    await page.click('[data-testid="record-button"]');
    await page.waitForTimeout(1000);
    
    // Simulate network failure
    await context.setOffline(true);
    await page.click('[data-testid="stop-button"]');
    
    // Verify offline handling
    await expect(page.locator('[data-testid="offline-indicator"]')).toBeVisible();
    
    // Restore network
    await context.setOffline(false);
    
    // Verify auto-retry
    await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible({ timeout: 10000 });
  });

  test('Large file upload handling', async ({ page }) => {
    await page.goto('/');
    
    // Authenticate
    await page.fill('[data-testid="email-input"]', 'doctor@hospital.com');
    await page.fill('[data-testid="password-input"]', 'healthcare123');
    await page.click('[data-testid="login-button"]');
    
    // Upload large file via file input
    const fileInput = page.locator('[data-testid="file-input"]');
    await fileInput.setInputFiles({
      name: 'large-audio.wav',
      mimeType: 'audio/wav',
      buffer: Buffer.alloc(50 * 1024 * 1024) // 50MB file
    });
    
    // Verify chunked upload progress
    await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();
    await expect(page.locator('[data-testid="progress-percentage"]')).toContainText('0%');
    
    // Wait for completion with extended timeout
    await expect(page.locator('[data-testid="upload-complete"]')).toBeVisible({ timeout: 60000 });
  });
});

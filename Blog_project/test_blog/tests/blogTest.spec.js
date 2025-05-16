const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('h2:has-text("Login")').first()).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()

      await textboxes[0].fill('mluukkai')
      await textboxes[1].fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()
    
      await expect(page.getByText('Matti Luukkainen is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()
  
      await textboxes[0].fill('mluukkai')
      await textboxes[1].fill('sininen')
  
      await page.getByRole('button', { name: 'login' }).click()
    
      await expect(page.locator('h1:has-text("wrong credentials")')).toBeVisible()
    })

  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Johan Klaus',
        username: 'BABBA',
        password: 'BABBA'
      }
    })

    await page.goto('http://localhost:5173')

    const textboxes = await page.getByRole('textbox').all()

    await textboxes[0].fill('mluukkai')
    await textboxes[1].fill('salainen')

    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'AddForm' }).click()

    const inboxes = await page.getByRole('textbox').all()

    await inboxes[0].fill('Puerto Rico')
    await inboxes[1].fill('Alejandor Gonzalez')
    await inboxes[2].fill('SouthBooks.col')

    await page.getByRole('button', { name: 'create' }).click()
  })




  test('a new blog can be created', async ({ page }) => {
    
    await expect(page.locator('h1:has-text("New blog added")')).toBeVisible()
  })

  test('a new blog can be created and liked', async ({ page }) => {
    await page.getByRole('button', { name: 'view' }).click()

    await page.getByRole('button', { name: 'like' }).click()
    
    await expect(page.locator('p:has-text("1")')).toBeVisible()
  })

  test('a new blog can be created and deleted', async ({ page }) => {

    page.on('dialog', async dialog => {
      if (dialog.type() === 'confirm') {
          console.log(dialog.message())
          await dialog.accept()
      }
    })

    await page.getByRole('button', { name: 'view' }).click()

    await page.getByRole('button', { name: 'remove' }).click()

    await expect(page.locator('h1:has-text("Blog deleted")')).toBeVisible()
    const check = page.locator('p:has-text("Alejandor Gonzalez")')
    
    await expect(check).not.toBeVisible()
  })

  test('other user cannot see remove button of other users blog', async ({ page }) => {

    page.on('dialog', async dialog => {
      if (dialog.type() === 'confirm') {
          console.log(dialog.message())
          await dialog.accept()
      }
    })

    await page.getByRole('button', { name: 'logout' }).click()

    await page.goto('http://localhost:5173')

    const inputen = await page.getByRole('textbox').all()

    await inputen[0].fill('BABBA')
    await inputen[1].fill('BABBA')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Johan Klaus is logged in')).toBeVisible()

    await page.getByRole('button', { name: 'view' }).click()

    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })



})

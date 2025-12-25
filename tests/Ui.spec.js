 const {test, expect} = require('@playwright/test');




 test('ui test', async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
     const userName = page.locator('[name="username"]');
 const password = page.locator('input#password');
 const signIn= page.locator('#signInBtn');

    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('chan');
    await password.fill('learning');
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signIn.click();

    //Playwright does not wait untill page loads to do next process for some of playwright components. 
     //So we have to use waitForLoadState or waitFor() to wait until the page fully loads #/
   // await page.waitForLoadState('domcontentloaded');
     
     await page.locator('.card-title a').first().waitFor();
     const cardPage = page.locator('.card-title a');
    // console.log(await cardPage.nth(1).textContent());
    //console.log(await cardPage.first().textContent());
    console.log(await cardPage.allTextContents());

    
})

test('UI Dom elements',async({page})=>{
      await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

     const userName = page.locator('[name="username"]');
 const password = page.locator('input#password');
 const signIn= page.locator('#signInBtn');

await userName.fill('rahulshettyacademy')
await password.fill('learning')
await page.locator('select').selectOption('Consultant')

//last() is used to select last element first() is used to select first element from the findings.
await page.locator('.customradio').last().click()
await page.locator('#okayBtn').click()

//this isChecked is used to print true/false based on the check status
console.log(await page.locator('.customradio').last().isChecked())
//Verify that radio button has checked
await expect(page.locator('.customradio').last()).toBeChecked;

await page.locator("#terms").click();
console.log(page.locator("#terms").isChecked())
await expect(page.locator("#terms")).toBeChecked;
//Playwright has uncheck options not not having assertion for unchchek()
await page.locator("#terms").uncheck();
//Here isChecked 
expect(await page.locator("#terms").isChecked()).toBeFalsy();
console.log(page.locator("#terms").isChecked())
////* is used in the attribute section is used to search continity and using toHaveAttribute is used to check any attribute
expect (await page.locator("a[href*='documents-request']")).toHaveAttribute("class", "blinkingText");

await page.locator("a[href*='documents-request']")

})


test.only('Handling child elements',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('[name="username"]');
    const newPageLink = page.locator("a[href*='documents-request']");
     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

     //promise is used to wait untill all exceuted in given array also here I have not used any w=await because waitForEvent execute before 
     //opening the new page so I have not used await 
    const [newPage] = await Promise.all([
    context.waitForEvent('page'), ///we have three status for execution progress, declined, passed
    newPageLink.click() ,
    ])
    const text=await newPage.locator('.red').textContent();
     console.log(text);
     //split is a type of lodash command when we install cypress it installs the lodash dependencies inbuiltly
    const arraytext = text.split("@"); 
    console.log(arraytext);
    const domain = arraytext[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
    await page.pause()

})
let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
//let pageName = process.argv[3];
//let postToLike = process.argv[4];
let url1, pwd1, user1,url2 ,user2,pwd2,url3,user3,pwd3;
(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    url = credentials.login;
    user = credentials.email;
    pwd = credentials.pwd;
    url2= credentials.tlogin;
    user2=credentials.temail;
    pwd2=credentials.tpwd;
    url3=credentials.llogin;
    user3=credentials.lemail;
    pwd3=credentials.pwd;
    msg=credentials.msg;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"],
        slowMo:100
    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    let tab2=await browser.newPage();
    let tab3= await browser.newPage();
    // goto page
    // 1. 
    (async function(){
        await tab.goto(url,{
            waitUntil:"networkidle0"})
            await tab.waitForSelector("#email");
    await tab.type("#email", user, { delay: 200 });
    await tab.type("input[data-testid='royal_pass']", pwd, { delay: 200 });
    await tab.click("#u_0_b");
    console.log("User logged in");
    // user,pwd,url
    await tab.goto("https://www.facebook.com/?ref=tn_tnmn",{
        waitUntil: "networkidle2"
    });
    await tab.waitForSelector("._3en1._480e.navigationFocus._23pl")
    await tab.click("._3en1._480e.navigationFocus._23pl")
    await tab.type("._3en1._480e.navigationFocus._23pl",msg,{delay:100});
    await tab.waitForSelector("._1mf7._4r1q._4jy0._4jy3._4jy1._51sy.selected._42ft")
    await tab.click("._1mf7._4r1q._4jy0._4jy3._4jy1._51sy.selected._42ft")
    console.log("posted on facebook")
         } )();
  
    (async function(){
         await tab2.goto(url2,{
             waitUntil:"networkidle0"})
             await tab2.waitForSelector('input[name="session[username_or_email]"]');
    await tab2.type('input[name="session[username_or_email]"]', user2, { delay: 200 });
    await tab2.type('input[name="session[password]"]', pwd2, { delay: 200 });
    await tab2.click('div[role="button"]');
    console.log("User logged in twitter");
    await tab2.waitForSelector(".DraftEditor-root")
     await tab2.click(".DraftEditor-root")
     await tab2.type(".DraftEditor-root",msg,{delay:100});
     await tab2.waitForSelector("div[data-testid='tweetButtonInline']")
     await tab2.click("div[data-testid='tweetButtonInline']")
      console.log("posted on twitter")
    
          } )();
             (async function(){
                await tab3.goto(url3, {
                        waitUntil: "networkidle0"})
                        await tab3.waitForSelector("#username");
    await tab3.type("#username", user3, { delay: 200 });
    await tab3.type("#password", pwd3, { delay: 200 });
    await tab3.click(".btn__primary--large.from__button--floating");
    console.log("User logged in linkedin");
    
    await tab3.waitForSelector(".share-box-feed-entry__trigger.t-16.t-black--light.t-bold")
    await tab3.click(".share-box-feed-entry__trigger.t-16.t-black--light.t-bold")
    await tab3.waitForSelector(".ql-editor.ql-blank");
    
    await tab3.type(".ql-editor.ql-blank",msg,{delay:100});
    await tab3.waitForSelector(".share-box-v2__actions.share-actions.mlA.ember-view")
    await tab3.click(".share-box-v2__actions.share-actions.mlA.ember-view")
   console.log("posted on linkedin")
                  }  )();

  })()

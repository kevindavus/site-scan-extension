//Pulling in all the data from JSON object

const page_body = document.body.textContent;
const pageParse = JSON.parse(page_body);
const site = pageParse.siteMeta || {};
const siteMeta = pageParse.siteMeta[0] || {};
const { timezone, recaptchaRequired } = site;
const {
  head,
  postBody,
  base,
  siteBasePath,
  redirects,
  globalCanonicalTag,
  robots,
  defaultSitemap,
  googleOptimizeId,
} = siteMeta;
const stylesData = pageParse.styles.styles;
let redirectsString = [];
let legacy = false;

// Legacy Interactions Finder

legacy = stylesData.some((styles) => styles.data.sel.includes('html.w-mod-js'));

// Look for template page - NEED TO FIX FOLDER ISSUE

// try{
// for (let i = 0; i < allPages.length; i++){
//     if (allPages[i].page.type !== "page"){
//         console.log("FOLDER")  }
//     else if (allPages[i].page.seoTitle === ""){
//         console.log("BLANK")
//     }
//     else if (allPages[i].page.type === "folder"){
//         console.log("FOLDER")
//     } else if (allPages[i].page.type === "page" && allPages[i].page.seoTitle.includes('template')){
//         console.log("Template")
//     } else {
//         console.log("SEO Title OK")
//     }
// }} catch(e){
//     console.log("YO",e)
//  }

// List all 301 redirects
try {
  if (redirects === null) {
    redirectsString = 'No redirects';
  } else {
    redirectsString = redirects.map(redirect => `${redirect.src} > ${redirect.target} \n`);
    ;
  }
} catch (e) {
  console.log('Error', e);
}
console.log(redirectsString);
// Prepare JSON data
let data = JSON.stringify({
  time: timezone,
  headCode: head,
  footerCode: postBody,
  redirects: redirectsString,
  base: base,
  href: siteBasePath,
  legacy: legacy,
  recaptcha: recaptchaRequired,
  canonical: globalCanonicalTag,
  robots: robots,
  sitemap: defaultSitemap,
  optimize: googleOptimizeId,
});

// Send message back to popup script
chrome.runtime.sendMessage(null, data);

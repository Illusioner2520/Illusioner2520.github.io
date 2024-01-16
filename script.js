let urls = {"am":"","cp":"https://bd3bca9c-d77d-4135-b4e9-44e5b3ea0702-00-1gqei1hp5bk09.global.replit.dev/","ha":"https://94ad6335-c523-41da-baaa-6a1c910935d3-00-2g7plqe2b4ok8.global.replit.dev/","cat":"https://adc1c3ce-09be-4974-b1eb-ec8af1def8ef-00-970bo4ymvtf7.global.replit.dev/","ae":"https://c3299d9e-1c5d-4fd9-a972-3593a235a373-00-10sz9b57iqog6.global.replit.dev/","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":"","":""}
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
document.getElementsByTagName("iframe")[0].setAttribute("src",urls[params.dir]);
document.title = document.getElementsByTagName("iframe")[0].contentDocument.title;

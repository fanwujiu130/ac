getArrRandomly = (arr) => {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemIndex = arr[randomIndex];
      arr[randomIndex] = arr[i];
      arr[i] = itemIndex;
    }
    return arr;
  }
  
 
  getRandomArr = (arr=[],num) => {
    const tmpArr = getArrRandomly(arr);
    let arrList = [];
    for (let i = 0; i < num; i++) {
      arrList.push(tmpArr[i]);
    };
    return arrList;
  }


function readShareCode() {
  console.log(`开始读取朱丽娜。。。`)
  return new Promise(async resolve => {
    $.get({url: `https://raw.githubusercontent.com/jd1994527314/iosrule/cs/JD_TG/JC.json`, 'timeout': 10000}, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            console.log(`随机取${randomCount}个码放到您固定的互助码后面(不影响已有固定互助)`)
            data = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
    await $.wait(10000);
    resolve()
  })
}
//格式化助力码
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
    $.newShareCodes = [];
    if ($.shareCodesArr[$.index - 1]) {
      $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
    } else {
      console.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码\n`)
      const tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
      $.newShareCodes = inviteCodes[tempIndex].split('@');
    }
    const readShareCodeRes = await readShareCode();
    
    if (readShareCodeRes && readShareCodeRes.code === 200) {
$.newShareCodes = [...new Set([...$.newShareCodes, ...(getRandomArr(getArrRandomly(readShareCodeRes.data),randomCount)|| [])])];
    }
    
    console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify($.newShareCodes)}`)





    resolve();
  })
}

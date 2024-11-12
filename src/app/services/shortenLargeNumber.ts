export function shortenLargeNumber(num:number, digits = 2) {
  var units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
      decimal;

  for (var i = units.length - 1; i >= 0; i--) {
      decimal = Math.pow(1000, i + 1);

      if (num <= -decimal || num >= decimal) {
        return +Math.round((num / decimal)) + units[i];
      }
  }
  if (num === 0) {
      return "";
  }
  return num.toString();
}

export function SetAmount(num:any,tshare:number,cbuyrate:number){
  if (isNaN(tshare) || tshare==undefined){
    tshare=0
  }
  if (isNaN(cbuyrate) || cbuyrate==undefined){
    cbuyrate=0
  }
  if(cbuyrate==0)
      cbuyrate=1
  if(tshare==1)
        tshare=0
  if(Number(num)!==NaN){
    if(num>0){
      let r= Math.round((num/(100-tshare)*100)*cbuyrate);
      if(r==Infinity || r==0){
        return num;
      }
      return r;
    }
    if(Math.round(num *cbuyrate)==0){
      return num;
    }
    return Math.round(num *cbuyrate);

  }else{
    return 0;
  }
}

// export function SetAmountXG(num:any){
//   const stakes = localStorage.getItem('stakes');
//   let cbuyrate=1;
//   let tshare=0;
//   if(stakes){
//     let d = JSON.parse(stakes);
//     cbuyrate = d.cBuyRate;
//     tshare = d.cShare + d.pShare;
//   }

//   if(Number(num)!==NaN){
//     if(num>0){
//       let r= Math.round((num/(100-tshare)*100)*cbuyrate);
//       if(r==Infinity){
//         return num;
//       }
//       return r;
//     }
//     return Math.round(num *cbuyrate);

//   }else{
//     return "";
//   }
// }


export function SetAmountXG1(num:any){
  var rate=sessionStorage.getItem('cbuyrate');
  var share=sessionStorage.getItem('tshare');
  let cbuyrate= 1;
  let tshare=0;
  if(rate)
    cbuyrate=parseFloat(rate);

  if(share)
    tshare=parseFloat(share);
    if(Number(num)!==NaN){
    if(num>0){
      let r= Math.round((num/(100-tshare)*100)*cbuyrate);
      if(r==Infinity){
        return num;
      }
      return r;
    }
    return Math.round(num *cbuyrate);

  }else{
    return "";
  }
}

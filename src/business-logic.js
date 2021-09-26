/*
Terms:
* ICR is the grams of carbohydrate counteracted by 1 unit of rapid-acting insulin
* FPU: fat–protein unit
 */

// [B5] =IF(B1>0,((B1*9)+(B2*4)),"")
export const calcFatProteinUnit = (fat, protein) => {
  if (fat <= 0) return "";

  return fat * 9 + protein * 4;
};

// [B7] =ARRAY_CONSTRAIN(
//         ARRAYFORMULA(
//           IFS(
//             B5="","",
//             B5>0,
//             ROUND(B5/100,1)
//           )
//         ), 1, 1)
export const calcCKal = (fatProteinUnit) => {
  if (fatProteinUnit === "") return "";

  if (fatProteinUnit > 0) {
    // needs to round to 1 decimal place
    // return Math.round(fatProteinUnit / 100).toFixed(1);
    return Number((fatProteinUnit / 100).toFixed(1));
  }

  return "";
};

// [B9] =ARRAY_CONSTRAIN(
//         ARRAYFORMULA(
//           IFS(
//             B5="","",
//             B5>0,ROUND(B5/10,0)
//           )
//         ), 1, 1)
export const calcCarbConversion = (fatProteinUnit) => {
  if (fatProteinUnit === "") return "";

  if (fatProteinUnit > 0) {
    // needs to round to 0 decimal places
    return Math.round(fatProteinUnit / 10).toFixed();
  }

  return "";
};

// [B11] ==ARRAY_CONSTRAIN(
//           ARRAYFORMULA(
//             IFS(
//               AND(B3="",B9=""),"",
//               AND(B3>0,B9>0),
//                 (
//                   ROUND(B9/B3,1)
//                 )
//               )
//           ), 1, 1)
export const calcInsulinDose = (irc, carbConversion) => {
  if (irc === "" || carbConversion === "") return "";

  if (irc > 0 && carbConversion > 0) {
    // needs to round to 1 decimal place
    // return Math.round(carbConversion / irc).toFixed(1);
    return Number((carbConversion / irc).toFixed(1));
  }

  return "";
};

// [B13] =ARRAY_CONSTRAIN(
//          ARRAYFORMULA(
//            IFS(
//              B7="","",
//              B7>4,"8",
//              (AND(
//                B7>=3,B7<4)),"5",
//              (AND(
//                B7>=2,B7<3)),"4",
//              (AND(
//                B7>=1,B7<2)),"3")
//            ), 1, 1)
export const calcDuration = (cKal) => {
  if (cKal === "") return "";

  if (cKal >= 4) return 8;

  if (cKal >= 3 && cKal < 4) return 5;

  if (cKal >= 2 && cKal < 3) return 4;

  if (cKal >= 1 && cKal < 2) return 3;

  return "";
};

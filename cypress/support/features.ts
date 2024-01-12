 import { isLubemobile } from "./utils";
 const wrench = {
  addVehicleViaVIN: true,
  addPayment:true,
  manageAndServiceConsole:true,
  lubemobileMenu: false
}
const lm = {
    addVehicleViaVIN: false,
    addPayment:false,
    manageAndServiceConsole:false,
    lubemobileMenu: true
}
export function getfeatures(){
    return isLubemobile()?lm:wrench;
}

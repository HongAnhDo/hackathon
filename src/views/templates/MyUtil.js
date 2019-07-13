import { reactLocalStorage } from "reactjs-localstorage";

const MyUtil = {
    webPsupport: async () => {
        var webp = new Image();
         webp.onerror =  function () {
           reactLocalStorage.setObject("webp_support", false)
        };
        webp.onload = function (){
            reactLocalStorage.setObject("webp_support", true)
           

        };
        webp.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
    }
}

export default MyUtil;

import { library } from "@fortawesome/fontawesome-svg-core";
import {fab, faCcMastercard, faCcVisa, faCcPaypal, faCcStripe, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import { faCartPlus, faShoppingCart, faChevronCircleDown, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons'

function initFontAwesome() {
    library.add(fab, faCcMastercard, faCcVisa, faCcPaypal, faCcStripe,faFacebook, faInstagram, 
        faShoppingCart,faCartPlus, faChevronCircleDown, faTrash, faWindowClose);
}
export default initFontAwesome;
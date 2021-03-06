package isha.store.controllers.client;


import isha.store.entity.ClientOrder;
import isha.store.dto.OrderForm;
import isha.store.model.ShoppingCart;
import isha.store.services.ClientService;
import isha.store.services.ProductService;
import isha.store.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.math.BigDecimal;

@Controller
@RequestMapping(value = "/ajax/orders")
public class AjaxOrderController {

    @Autowired
    ClientService clientService;
    @Autowired
    ProductService productService;

    @RequestMapping(value = "/new", method = RequestMethod.POST, produces = "application/json")
    public String newClientOrder(@Valid @RequestBody OrderForm orderForm, BindingResult bindingResult, Model model, HttpSession session) {

        if (bindingResult.hasErrors()) {
            return "fragment/checkout-page :: checkout";
        }
        System.out.println(orderForm);
        ShoppingCart shoppingCart = (ShoppingCart) session.getAttribute(Constants.CURRENT_SHOPPING_CART);
        ClientOrder clientOrder = clientService.newClientOrder(shoppingCart,orderForm);
        model.addAttribute("totalCost", shoppingCart.getTotalCost().doubleValue());

        shoppingCart.getItems().clear();
        shoppingCart.setTotalCost(BigDecimal.ZERO);
        shoppingCart.setTotalCount(0);
        session.setAttribute(Constants.CURRENT_SHOPPING_CART,shoppingCart);
        model.addAttribute("clientOrder", clientOrder);
        System.out.println(clientOrder);

        return "fragment/order-complete :: order-complete";
    }

}

package isha.store.model;

import com.fasterxml.jackson.annotation.JsonView;
import isha.store.entity.Product;
import isha.store.utils.Views;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

public class ShoppingCart {

    private Map<Long, ShoppingCartItem> products = new LinkedHashMap<>();

    @JsonView(Views.Public.class)
    private BigDecimal totalCost = BigDecimal.ZERO;
    @JsonView(Views.Public.class)
    private int totalCount = 0;


    /**
    Метод добовляет продукт в корзину
     */
    public void addProduct(Product product, int count) {

        ShoppingCartItem shoppingCartItem = products.get(product.getId());

        if (shoppingCartItem == null) {

            shoppingCartItem = new ShoppingCartItem(product, count);
            products.put(product.getId(), shoppingCartItem);
        } else {
            shoppingCartItem.setCount(shoppingCartItem.getCount() + count);
            products.replace(product.getId(), shoppingCartItem);
        }
        refreshStatistics();

    }

    public void removeProduct(Long idProduct, int count) {
        ShoppingCartItem shoppingCartItem = products.get(idProduct);
        if (shoppingCartItem != null) {
            if (shoppingCartItem.getCount() > count) {
                shoppingCartItem.setCount(shoppingCartItem.getCount() - count);
            } else {
                products.remove(idProduct);
            }
            refreshStatistics();
        }
    }

    /**
     Метод обновляет данные в корзине
     */
        private void refreshStatistics() {
            totalCount = 0;
            totalCost = BigDecimal.ZERO;
            for (ShoppingCartItem shoppingCartItem : products.values()) {
                totalCount += shoppingCartItem.getCount();
                totalCost = totalCost.add(shoppingCartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(shoppingCartItem.getCount())));
            }
        }

    public Collection<ShoppingCartItem> getItems() {
        return products.values();
    }

    public Map<Long, ShoppingCartItem> getProducts() {
        return products;
    }

    public void setProducts(Map<Long, ShoppingCartItem> products) {
        this.products = products;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    @Override
    public String toString() {
        return "ShoppingCart{" +
                "totalCost=" + totalCost +
                ", totalCount=" + totalCount +
                '}';
    }
}

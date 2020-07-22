package isha.ishop.services;

import isha.ishop.entity.Category;
import isha.ishop.entity.Producer;
import isha.ishop.entity.Product;
import isha.ishop.entity.Subcategory;

import java.util.List;

public interface ProductService {

    public Product findProductById(Long id);

    public List <Product> findProductByNameLike(String name);

    public List<Subcategory> findAllSubCategory();

    public List<Category> findAllCategory();

    public List<Producer> findAllProducer();

    public List<Product> listAllProducts(int page, int limit);




}

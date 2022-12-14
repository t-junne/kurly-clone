package Web2.kurlyclone.api.goods;

import lombok.Data;

@Data
public class ProductDto {

    private String category;
    private String subCategory;
    private String thumbnail;
    private String name;
    private String description;
    private Integer price;
    private Float discount;
    private String info;
    private String imgMain;
}

package com.marketplace.market.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.Category;
import com.marketplace.market.models.CustomResponse;
import com.marketplace.market.models.ItemsPerCategory;
import com.marketplace.market.services.CategoryServices;

@RestController
@RequestMapping(value = "/category")
public class CategoryController {
    @Autowired
    private CategoryServices categoryServices;

    @GetMapping(path = "/all")
    public ResponseEntity<CustomResponse<List<Category>>> getAllCategories() {
        try {
            List<Category> categories = categoryServices.findAll();

            if (categories.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new CustomResponse<List<Category>>(Collections.emptyList(),
                                "No categories have been added.",
                                null));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<List<Category>>(categories, "All categories found successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<List<Category>>(null,
                    "Some error occurred while fetching the categories.", e.getMessage()));
        }
    }

    @GetMapping(path = "/{categoryId}")
    public ResponseEntity<CustomResponse<Category>> getCategory(@PathVariable("categoryId") int categoryId) {
        try {
            Optional<Category> category = categoryServices.findById(categoryId);

            if (!category.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CustomResponse<Category>(null, "Requested category does not exist.", null));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<Category>(category.get(), "Category found successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<Category>(null, "Some error occurred while getting the category.",
                            e.getMessage()));
        }
    }

    @GetMapping(path = "/items-per-category")
    public ResponseEntity<CustomResponse<List<ItemsPerCategory>>> getItemsPerCategory() {
        try {
            List<Category> categories = categoryServices.findAll();

            if (categories.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new CustomResponse<List<ItemsPerCategory>>(null, "No data present.", null));
            }

            List<ItemsPerCategory> itemsPerCategory = new ArrayList<ItemsPerCategory>();

            for (Category category : categories) {
                itemsPerCategory.add(new ItemsPerCategory(category.getName(), category.getItems().size()));
            }

            return ResponseEntity.status(HttpStatus.OK).body(new CustomResponse<List<ItemsPerCategory>>(
                    itemsPerCategory, "Successfully fetch items per category.", null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<List<ItemsPerCategory>>(null,
                            "Some error occurred while fetching the categories.", e.getMessage()));
        }
    }

    @PostMapping(path = "/add-category")
    public ResponseEntity<CustomResponse<Category>> addCategory(@RequestBody Category category) {
        try {
            if (categoryServices.existsById(category.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new CustomResponse<Category>(null, "The category already exists.",
                                "Existing category cannot be re-added."));
            }
            categoryServices.save(category);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new CustomResponse<Category>(category, "Successfully added the category.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<Category>(null, "Some error occurred while adding the category.",
                            e.getMessage()));
        }
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<CustomResponse<Category>> deleteCategory(@RequestParam("id") int categoryId) {
        try {
            Optional<Category> category = categoryServices.findById(categoryId);

            if (!category.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CustomResponse<Category>(null, null, "Requested category does not exist."));
            }

            categoryServices.deleteById(categoryId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<Category>(category.get(), "Successfully deleted the category.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<Category>(null, "Some error occurred while deleting the category.",
                            e.getMessage()));
        }
    }

    @PatchMapping(path = "/update")
    public ResponseEntity<CustomResponse<Category>> updateCategory(@RequestBody Category category,
            @RequestParam("id") int categoryId) {
        try {
            Optional<Category> existingCategory = categoryServices.findById(categoryId);

            if (!existingCategory.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CustomResponse<Category>(null, null, "Requested category does not exist."));
            }

            categoryServices.updateCategoryById(categoryId, category.getName(), category.getIsTaxApplicable(),
                    category.getTax(), category.getServiceTax());

            Category updatedCategory = new Category(
                    categoryId,
                    category.getName(),
                    category.getServiceTax(),
                    category.getTax(),
                    category.getIsTaxApplicable(),
                    category.getItems());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<Category>(updatedCategory, "Updated category successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<Category>(null, "Some error occurred while updating.", e.getMessage()));
        }
    }

}

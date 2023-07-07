package com.marketplace.market.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.Category;
import com.marketplace.market.models.CategoryResponse;
import com.marketplace.market.services.CategoryServices;

@RestController
@RequestMapping(value = "/category")
public class CategoryController {
    @Autowired
    private CategoryServices categoryServices;

    @GetMapping(path = "/{categoryId}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable("categoryId") int categoryId) {
        try {
            Optional<Category> category = categoryServices.findById(categoryId);

            if (!category.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CategoryResponse(null, "Requested category does not exist.", null));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CategoryResponse(category.get(), "Category found successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CategoryResponse(null, "Some error occurred while getting the category.",
                            e.getMessage()));
        }
    }

    @PostMapping(path = "/add-category")
    public ResponseEntity<CategoryResponse> addCategory(@RequestBody Category category) {
        try {
            categoryServices.save(category);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new CategoryResponse(category, "Successfully added the category.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CategoryResponse(null, "Some error occurred while adding the category.", e.getMessage()));
        }
    }

    @DeleteMapping(path = "/delete/{categoryId}")
    public ResponseEntity<CategoryResponse> deleteCategory(@PathVariable("categoryId") int categoryId) {
        try {
            Optional<Category> category = categoryServices.findById(categoryId);

            if (!category.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CategoryResponse(null, null, "Requested category does not exist."));
            }

            categoryServices.deleteById(categoryId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CategoryResponse(category.get(), "Successfully deleted the category.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CategoryResponse(null, "Some error occurred while deleting the category.",
                            e.getMessage()));
        }
    }

    @PatchMapping(path = "/update/{categoryId}")
    public ResponseEntity<CategoryResponse> updateCategory(@RequestBody Category category,
            @PathVariable("categoryId") int categoryId) {
        try {
            Optional<Category> existingCategory = categoryServices.findById(categoryId);

            if (!existingCategory.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CategoryResponse(null, null, "Requested category does not exist."));
            }

            categoryServices.updateCategoryById(categoryId, category.getName(), category.getIsTaxApplicable());

            Category updatedCategory = new Category(
                    categoryId,
                    category.getName(),
                    category.getIsTaxApplicable());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CategoryResponse(updatedCategory, "Updated category successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CategoryResponse(null, "Some error occurred while updating.", e.getMessage()));
        }
    }

}

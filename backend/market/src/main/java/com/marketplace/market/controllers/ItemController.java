package com.marketplace.market.controllers;

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
import com.marketplace.market.models.Item;
import com.marketplace.market.models.ItemSold;
import com.marketplace.market.services.ItemServices;
import com.marketplace.market.services.ItemSoldServices;
import com.marketplace.market.services.CategoryServices;

@RestController
@RequestMapping(value = "/item")
public class ItemController {

	@Autowired
	private ItemServices itemServices;

	@Autowired
	private CategoryServices categoryServices;

	@Autowired
	private ItemSoldServices itemSoldServices;

	@GetMapping("/all")
	public ResponseEntity<CustomResponse<List<Item>>> getItems() {
		try {
			List<Item> items = itemServices.findAll();

			if (items.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK)
						.body(new CustomResponse<List<Item>>(Collections.emptyList(),
								"No items have been added.",
								null));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<List<Item>>(items, "All items found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<List<Item>>(null,
					"Some error occurred while fetching the items.", e.getMessage()));
		}
	}

	@GetMapping("/{itemId}")
	public ResponseEntity<CustomResponse<Item>> getItemById(@PathVariable("itemId") int itemId) {
		try {
			Optional<Item> item = itemServices.findById(itemId);

			if (!item.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<Item>(null, null, "Requested item does not exist."));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<Item>(item.get(), "Item found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new CustomResponse<Item>(null, "Some error occurred while getting the item.",
							e.getMessage()));
		}
	}

	@GetMapping("")
	public ResponseEntity<CustomResponse<List<Item>>> getItemsByName(@RequestParam("name") String name) {
		try {
			List<Item> itemsByName = itemServices.findByNameEquals(name);

			if (itemsByName.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK)
						.body(new CustomResponse<List<Item>>(Collections.emptyList(),
								"No items with the name " + name + " have been added.",
								null));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<List<Item>>(itemsByName,
							"All items with name " + name + " found successfully.",
							null));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new CustomResponse<List<Item>>(null, "Some error occurred while getting the item(s).",
							e.getMessage()));
		}
	}

	@GetMapping("/stock-finishing")
	public ResponseEntity<CustomResponse<List<Item>>> getStockLessThan5() {
		try {
			List<Item> nearOutOfStockItems = itemServices.findByStockLessThanOrderByStockAsc(5);

			if (nearOutOfStockItems.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK)
						.body(new CustomResponse<List<Item>>(Collections.emptyList(),
								"No items going out of stock yet.",
								null));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<List<Item>>(nearOutOfStockItems,
							"Near out of stock items fetched successfully.",
							null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new CustomResponse<List<Item>>(null, "Some error occurred while processing.",
							e.getMessage()));
		}
	}

	@GetMapping("/top-items")
	public ResponseEntity<CustomResponse<List<ItemSold>>> getTopItems() {
		try {
			List<ItemSold> topItems = itemSoldServices.findTop7SoldItems();

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<List<ItemSold>>(topItems,
							"Fetched top items successfully.",
							null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new CustomResponse<List<ItemSold>>(null, "Some error occurred while processing.",
							e.getMessage()));
		}
	}

	@PostMapping("/add-item")
	public ResponseEntity<CustomResponse<Item>> addItem(@RequestBody Item item) {
		try {
			int categoryId = item.getCategory().getId();

			Optional<Category> category = categoryServices.findById(categoryId);

			if (!category.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<Item>(null, null, "Category with entered id does not exist."));
			}

			Item newItem = new Item(item.getItemId(), item.getName(), item.getPrice(), item.getStock(),
					item.isActive(), item.getDiscountPer(), item.getCostPrice(), item.getSupplier(), category.get());

			itemServices.save(newItem);

			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new CustomResponse<Item>(item, "Created item that references " + category, null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new CustomResponse<Item>(null, "Some error occurred while adding the new item.",
							e.getMessage()));
		}
	}

	@DeleteMapping("/delete-item")
	public ResponseEntity<CustomResponse<Item>> deleteItem(@RequestParam("id") int itemId) {
		try {
			Optional<Item> existingItem = itemServices.findById(itemId);

			if (!existingItem.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<Item>(null, null, "Requested item does not exist."));
			}

			itemServices.deleteById(itemId);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<Item>(null, "Item deleted successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new CustomResponse<Item>(null, "Some error occurred while deleting the user.",
							e.getMessage()));
		}
	}

	@PatchMapping("/update")
	public ResponseEntity<CustomResponse<Item>> updateItem(@RequestBody Item item, @RequestParam("id") int itemId) {
		try {
			Optional<Item> existingItem = itemServices.findById(itemId);

			if (!existingItem.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<Item>(null, null, "Item with this id does not exist."));
			}

			int categoryId = item.getCategory().getId();
			Optional<Category> category = categoryServices.findById(categoryId);

			if (!category.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<Item>(null, null,
								"Category with id " + categoryId + " does not exist."));
			}

			Item updatedItem = new Item(item.getItemId(), item.getName(), item.getPrice(), item.getStock(),
					item.isActive(),
					item.getDiscountPer(), item.getCostPrice(), item.getSupplier(), category.get());

			itemServices.updateItemById(itemId,
					item.getPrice(),
					item.getName(),
					item.getStock(),
					item.isActive(),
					item.getDiscountPer(),
					item.getCostPrice(), item.getSupplier());

			return ResponseEntity.status(HttpStatus.OK).body(
					new CustomResponse<Item>(updatedItem, "Item updated successfully.", null));
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
					new CustomResponse<Item>(null, "Some error occurred while updating the item.", e.getMessage()));
		}
	}

}

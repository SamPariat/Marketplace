package com.marketplace.market.controllers;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.BillingRequest;
import com.marketplace.market.models.BillingTable;
import com.marketplace.market.models.Category;
import com.marketplace.market.models.CustomResponse;
import com.marketplace.market.models.Item;
import com.marketplace.market.models.ItemSold;
import com.marketplace.market.models.NameIdQuantity;
import com.marketplace.market.services.BillingTableServices;
import com.marketplace.market.services.CategoryServices;
import com.marketplace.market.services.ItemServices;
import com.marketplace.market.services.ItemSoldServices;

@RestController
@RequestMapping(value = "/billing")
public class BillingController {
	@Autowired
	private BillingTableServices billingService;

	@Autowired
	private ItemServices itemServices;

	@Autowired
	private CategoryServices categoryServices;
	
	@Autowired
	private ItemSoldServices itemSoldServices;

	@GetMapping("/time")
	public LocalDateTime time() {
		LocalDateTime time = LocalDateTime.now();
		return time;
	}

	@GetMapping("")
	public ResponseEntity<CustomResponse<BillingTable>> getBillById(@RequestParam("id") int billId) {
		try {
			Optional<BillingTable> bill = billingService.findById(billId);
			if (!bill.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<BillingTable>(null, null, "Requested bill does not exist."));
			}
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<BillingTable>(bill.get(), "Bill found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<BillingTable>(null,
					"Some error occurred while getting the bill.", e.getMessage()));
		}
	}

	@GetMapping("/bill/{itemId}")
	public ResponseEntity<CustomResponse<BillingTable>> getBill(@PathVariable("itemId") int itemId) {
		try {
			Item bill = itemServices.findById(itemId).orElse(null);

			Category checkTax = categoryServices.findById(itemId).orElse(null);

			if (bill == null) {
				return ResponseEntity.status(HttpStatus.OK).body(new CustomResponse<BillingTable>(
						null, "No item with such itemId is present", null));
			}
			double priceAfterTax;
			if (checkTax.getIsTaxApplicable()) {
				priceAfterTax = (checkTax.getTax() + checkTax.getServiceTax()) * bill.getPrice() * 0.01
						+ (-bill.getDiscountPer()) * bill.getPrice() * 0.01;
			} else {
				priceAfterTax = (-bill.getDiscountPer()) * bill.getPrice() * 0.01;
			}
			double finalAmount = bill.getPrice() + priceAfterTax - bill.getDiscountPrice();
			int remainingStock = bill.getStock();
			bill.setStock(remainingStock - 1);

			BillingTable newBill = new BillingTable();
			newBill.setServiceTax(checkTax.getServiceTax());
			newBill.setCgst((checkTax.getTax()) / 2);
			newBill.setSgst((checkTax.getTax()) / 2);
			newBill.setDiscountPercentage(bill.getDiscountPer());
			newBill.setDiscountAmount(bill.getDiscountPrice());
			newBill.setTotalAmount(finalAmount);
			newBill.setTimeStamp(LocalDateTime.now());
			newBill.setBillerId(1);
			// newBill.setItemId(itemId);
			billingService.save(newBill);
			return ResponseEntity.status(HttpStatus.OK).body(new CustomResponse<BillingTable>(
					newBill, "Items billed successfully", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<BillingTable>(null,
					"Some error occurred while trying to save the bill.", e.getMessage()));
		}

	}

	@GetMapping("/bills")
	public ResponseEntity<CustomResponse<List<BillingTable>>> getAllBills() {
		try {

			List<BillingTable> bills = billingService.findAll();

			if (bills.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK).body(
						new CustomResponse<List<BillingTable>>(Collections.emptyList(), "No bills are present.", null));

			}
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<List<BillingTable>>(bills, "All bills found successfully.", null));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<List<BillingTable>>(
					null, "Some error occurred while fetching the bills.", e.getMessage()));
		}
	}

	@PostMapping("/addBill")
	public ResponseEntity<CustomResponse<BillingTable>> addItem(@RequestBody BillingRequest billingRequest) {
		try {
			BillingTable bill = billingRequest.getBillingTable();
			List<NameIdQuantity> boughtItemsInfo = billingRequest.getItemQuantities();

			Set<Integer> idsOfItems = new HashSet<>(); // The list of item ids from the bill

			for (Item item : bill.getItems()) {
				idsOfItems.add(item.getItemId());
			}

			Set<Integer> notFoundIds = new TreeSet<>(); // Returns a sorted list of items that don't exist
			Set<Item> items = new HashSet<>(); // Returns a list of items that exist

			for (int itemId : idsOfItems) {
				Optional<Item> existingItem = itemServices.findById(itemId);
				if (!existingItem.isPresent()) {
					notFoundIds.add(itemId);
				} else {
					items.add(existingItem.get());
				}
			}

			if (notFoundIds.size() > 0) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<BillingTable>(null, null,
								"Cannot find the following items: " + notFoundIds));
			}

			for (NameIdQuantity niq : boughtItemsInfo) {
				String itemName = niq.getName();
				int itemId = niq.getItemId();
				int quantity = niq.getQuantity();

				Optional<ItemSold> existingItem = itemSoldServices.findByNameAndId(itemName, itemId);

				if (!existingItem.isPresent()) {
					String itemSupplier = itemServices.findById(itemId).get().getSupplier();
					itemSoldServices.save(new ItemSold(itemId, itemName, quantity, itemSupplier, LocalDateTime.now()));
				} else {
					int newQty = existingItem.get().getQuantity() + quantity;
					existingItem.get().setQuantity(quantity);
					itemSoldServices.updateItemSoldById(itemId, newQty);
				}
			}

			bill.setTimeStamp(LocalDateTime.now());
			bill.setItems(items);
			billingService.save(bill);
			bill.setTimeStamp(LocalDateTime.now());
			bill.setItems(items);
			billingService.save(bill);

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<BillingTable>(bill, "Successfully added the bill.", null));
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
					new CustomResponse<BillingTable>(null, "Some error occurred while trying to save the bill.",
							e.getMessage()));
		}
	}

	@GetMapping("/billId/{billId}")
	public ResponseEntity<CustomResponse<BillingTable>> getItemById(@PathVariable Integer billId) {
		try {
			Optional<BillingTable> bill = billingService.findById(billId);
			if (!bill.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<BillingTable>(null, null, "Requested bill does not exist."));
			}
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<BillingTable>(bill.get(), "Bill found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<BillingTable>(null,
					"Some error occurred while getting the bill.", e.getMessage()));
		}
	}

}
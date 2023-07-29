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
import com.marketplace.market.models.CustomResponse;
import com.marketplace.market.models.Item;
import com.marketplace.market.models.ItemSold;
import com.marketplace.market.models.NameIdQuantity;
import com.marketplace.market.models.SalesPerDate;
import com.marketplace.market.services.BillingTableServices;
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
	private ItemSoldServices itemSoldServices;

	private void saveToSoldItem(List<NameIdQuantity> boughtItemsInfo) {
		for (NameIdQuantity niq : boughtItemsInfo) {
			String itemName = niq.getName();
			int itemId = niq.getItemId();
			int quantity = niq.getQuantity();

			Optional<ItemSold> existingItem = itemSoldServices.findByNameAndId(itemName, itemId);

			if (!existingItem.isPresent()) {
				String itemSupplier = itemServices.findById(itemId).get().getSupplier();
				itemSoldServices.save(new ItemSold(itemId, itemName, quantity, itemSupplier, LocalDateTime.now()));
			} else {
				System.out.println(existingItem.get().getQuantity());
				int newQty = existingItem.get().getQuantity() + quantity;
				itemSoldServices.updateItemSoldById(itemId, newQty);
			}
		}
	}

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

	@GetMapping("/sales-per-day")
	public ResponseEntity<CustomResponse<List<SalesPerDate>>> getSalesPerDay() {
		try {
			List<SalesPerDate> salesPerDate = billingService.salesGroupedByDate();

			if (salesPerDate.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK).body(
						new CustomResponse<List<SalesPerDate>>(Collections.emptyList(), "No sales yet.", null));
			}

			return ResponseEntity.status(HttpStatus.OK).body(
					new CustomResponse<List<SalesPerDate>>(salesPerDate, "Fetched sales succesfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<List<SalesPerDate>>(
					null, "Some error occurred while fetching the sales.", e.getMessage()));
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

			bill.setTimeStamp(LocalDateTime.now());
			bill.setItems(items);
			saveToSoldItem(boughtItemsInfo);
			System.out.println(bill);
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
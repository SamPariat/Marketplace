package com.marketplace.market.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.BillingTable;
import com.marketplace.market.models.CustomResponse;
import com.marketplace.market.models.Item;
import com.marketplace.market.services.BillingTableServices;
import com.marketplace.market.services.ItemServices;

@RestController
@RequestMapping(value = "/billing")
public class BillingController {
	@Autowired
	private BillingTableServices billingService;

	@Autowired
	private ItemServices itemServices;

	@GetMapping("/bill/{itemId}")
	public String getBill(@PathVariable("itemId") int itemId) {
		Item bill = itemServices.findById(itemId).orElse(null);
		BillingTable values = billingService.findById(itemId).orElse(null);
		double per = (values.getCgst() + values.getSgst() - bill.getDiscountPer()) * bill.getPrice() * 0.01;
		double finalAmount = bill.getPrice() + per - values.getDiscountAmount();
		int remainingStock = bill.getStock();
		bill.setStock(remainingStock - 1);
		itemServices.save(bill);
		return "Sgst:" + values.getSgst() * bill.getPrice() + "\ncgst:" + values.getCgst() * bill.getPrice()
				+ "\nfinalAmount:" + finalAmount;

	}

	@GetMapping("/bills")
	public ResponseEntity<CustomResponse<List<BillingTable>>> getItems() {

		try {
			List<BillingTable> bills = billingService.findAll();

			if (bills.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK).body(
						new CustomResponse<List<BillingTable>>(Collections.emptyList(), "No Bills are present", null));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<List<BillingTable>>(bills, "All bills found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<List<BillingTable>>(null,
					"Some error occurred while fetching the items.", e.getMessage()));
		}
	}

	@PostMapping("/addBill")
	public ResponseEntity<CustomResponse<BillingTable>> addItem(@RequestBody BillingTable bill) {

		try {
			billingService.save(bill);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new CustomResponse<BillingTable>(bill, "Created Bill successfully ", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
					new CustomResponse<BillingTable>(null, "some Error occured while adiing new Item", e.getMessage()));
		}
	}

	@GetMapping("/billId/{billId}")
	public ResponseEntity<CustomResponse<BillingTable>> getItemById(@PathVariable Integer billId) {
		try {
			Optional<BillingTable> bill = billingService.findById(billId);
			if (!bill.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<BillingTable>(null, null, "Requested Bill does not exist"));
			}
			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<BillingTable>(bill.get(), "Bill found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<BillingTable>(null,
					"Some error occurred while getting the Bill.", e.getMessage()));
		}
	}
}
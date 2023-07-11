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

    @GetMapping("/time")
    public LocalDateTime time() {
        LocalDateTime time = LocalDateTime.now();
        return time;
    }

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
                        new CustomResponse<List<BillingTable>>(Collections.emptyList(), "No bills are present.", null));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<List<BillingTable>>(bills, "All bills found successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<List<BillingTable>>(null,
                            "Some error occurred while fetching the bills.", e.getMessage()));
        }
    }

    @PostMapping("/addBill")
    public ResponseEntity<CustomResponse<BillingTable>> addItem(@RequestBody BillingTable bill) {
        try {
            Set<Integer> idsOfItems = new HashSet<>();

            for (Item item : bill.getItems()) {
                idsOfItems.add(item.getItemId());
            }

            Set<Integer> notFoundIds = new TreeSet<>();
            Set<Item> items = new HashSet<>();

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

            BillingTable newBill = new BillingTable(bill.getBillId(), bill.getServiceTax(), bill.getCgst(),
                    bill.getSgst(),
                    bill.getDiscountPercentage(), bill.getDiscountAmount(), bill.getTotalAmount(), bill.getTimeStamp(),
                    bill.getBillerId(), bill.getItemId(), items);

            billingService.save(newBill);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<BillingTable>(bill, "Successfully added the bill.", null));
        } catch (Exception e) {
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
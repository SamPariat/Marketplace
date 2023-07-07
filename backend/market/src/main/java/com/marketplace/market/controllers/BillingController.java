package com.marketplace.market.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.BillingTable;
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
    public List<BillingTable> getItems() {

        return billingService.findAll();
    }

    @PostMapping("/addBill")
    public BillingTable addItem(@RequestBody BillingTable bill) {

        billingService.save(bill);
        return bill;
    }

    @GetMapping("/billId/{billId}")
    public Item getItemById(@PathVariable Integer itemId) {

        Item item = itemServices.findById(itemId).orElse(null);
        return item;
    }

}
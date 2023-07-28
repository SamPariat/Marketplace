package com.marketplace.market.models;

import java.util.HashMap;

public class BillingRequest {
    private BillingTable billingTable;
    private HashMap<String, Integer> itemQuantities;

    public BillingTable getBillingTable() {
        return billingTable;
    }

    public void setBillingTable(BillingTable billingTable) {
        this.billingTable = billingTable;
    }

    public HashMap<String, Integer> getItemQuantities() {
        return itemQuantities;
    }

    public void setItemQuantities(HashMap<String, Integer> itemQuantities) {
        this.itemQuantities = itemQuantities;
    }

    public BillingRequest() {
    }

    public BillingRequest(BillingTable billingTable, HashMap<String, Integer> itemQuantities) {
        this.billingTable = billingTable;
        this.itemQuantities = itemQuantities;
    }

    @Override
    public String toString() {
        return "BillingRequest [billingTable=" + billingTable + ", itemQuantities=" + itemQuantities + "]";
    }

}

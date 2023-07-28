package com.marketplace.market.models;

import java.util.List;

public class BillingRequest {
    private BillingTable billingTable;

    private List<NameIdQuantity> itemQuantities;

    public BillingTable getBillingTable() {
        return billingTable;
    }

    public void setBillingTable(BillingTable billingTable) {
        this.billingTable = billingTable;
    }

    public List<NameIdQuantity> getItemQuantities() {
        return itemQuantities;
    }

    public void setItemQuantities(List<NameIdQuantity> itemQuantities) {
        this.itemQuantities = itemQuantities;
    }

    public BillingRequest() {
    }

    public BillingRequest(BillingTable billingTable, List<NameIdQuantity> itemQuantities) {
        this.billingTable = billingTable;
        this.itemQuantities = itemQuantities;
    }

    @Override
    public String toString() {
        return "BillingRequest [billingTable=" + billingTable + ", itemQuantities=" + itemQuantities + "]";
    }

}
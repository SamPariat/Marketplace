package com.marketplace.market.models;

import java.sql.Date;

public class SalesPerDate {
    private double sales;
    private Date date;

    public double getSales() {
        return sales;
    }

    public void setSales(double sales) {
        this.sales = sales;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public SalesPerDate() {
    }

    public SalesPerDate(double sales, Date date) {
        this.sales = sales;
        this.date = date;
    }

    @Override
    public String toString() {
        return "SalesPerDate [sales=" + sales + ", date=" + date + "]";
    }

}

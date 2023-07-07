package com.marketplace.market.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;

    private boolean isTaxApplicable;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIsTaxApplicable() {
        return isTaxApplicable;
    }

    public void setIsTaxApplicable(boolean isTaxApplicable) {
        this.isTaxApplicable = isTaxApplicable;
    }

    public Category() {
    }

    public Category(int id, String name, boolean isTaxApplicable) {
        this.id = id;
        this.name = name;
        this.isTaxApplicable = isTaxApplicable;
    }

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + ", isTaxApplicable=" + isTaxApplicable + "]";
    }

}

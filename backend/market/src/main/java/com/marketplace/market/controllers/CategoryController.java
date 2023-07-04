package com.marketplace.market.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.services.CategoryServices;

@RestController
@RequestMapping(value = "/category")
public class CategoryController {
    private CategoryServices categoryServices;
}

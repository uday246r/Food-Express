package com.foodexpress.admin.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.HashMap;
import java.util.HashSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodexpress.admin.dao.OrderItemDao;
import com.foodexpress.admin.dao.MenuItemDao;
import com.foodexpress.admin.model.OrderItem;
import com.foodexpress.admin.dao.RestaurantRegisterDao;
import com.foodexpress.admin.dto.CustomerMenuPreferenceStats;
import com.foodexpress.admin.model.RestaurantRegister;
import com.foodexpress.admin.model.RestaurantMenuItem;

@Service
public class OrderItemService implements IOrderItem {

    @Autowired
    private OrderItemDao orderItemDao;

    @Autowired
    private MenuItemDao menuItemDao;

    @Autowired
    private RestaurantRegisterDao restaurantRegisterDao;

    @Override
    public List<OrderItem> getOrderItems(int restaurantId) {
        // Fetch order items for the specified restaurant
        List<OrderItem> orderItems = orderItemDao.findByRestaurantId(restaurantId);

        if (orderItems.isEmpty()) {
            return orderItems;
        }

        // Collect unique restaurantIds and itemIds to avoid N+1 queries
        Set<Integer> restaurantIds = new HashSet<>();
        Set<Integer> itemIds = new HashSet<>();
        for (OrderItem orderItem : orderItems) {
            restaurantIds.add(orderItem.getRestaurantId());
            itemIds.add(orderItem.getItemId());
        }

        // Load all needed restaurants and menu items in batches
        Map<Integer, RestaurantRegister> restaurantMap = new HashMap<>();
        for (RestaurantRegister r : restaurantRegisterDao.findAllById(restaurantIds)) {
            restaurantMap.put(r.getRestaurantId(), r);
        }

        Map<Integer, RestaurantMenuItem> menuItemMap = new HashMap<>();
        for (RestaurantMenuItem m : menuItemDao.findAllById(itemIds)) {
            menuItemMap.put(m.getItemId(), m);
        }

        // Populate restaurantName and itemName fields using in-memory maps
        for (OrderItem orderItem : orderItems) {
            RestaurantRegister restaurant = restaurantMap.get(orderItem.getRestaurantId());
            orderItem.setRestaurantName(restaurant != null ? restaurant.getName() : "Unknown Restaurant");

            RestaurantMenuItem menuItem = menuItemMap.get(orderItem.getItemId());
            orderItem.setItemName(menuItem != null ? menuItem.getName() : "Unknown Item");
        }

        return orderItems;
    }

    @Override
    public boolean updateOrderStatus(OrderItem orderItem) {
        orderItemDao.save(orderItem); // Save the updated order item
        return true;
    }
    
    public List<CustomerMenuPreferenceStats> getMenuPreferencesForRestaurant(int restaurantId) {
        // Get the results from the repository
        List<Object[]> results = orderItemDao.findCustomerMenuPreferenceStatsByRestaurantId(restaurantId);
        
        // Calculate the total order count across all items
        long totalOrderCount = 0;
        for (Object[] row : results) {
            totalOrderCount += (Long) row[1];  // Add the order count for each item
        }

        // Create a list of stats for each dish, with calculated percentage
        List<CustomerMenuPreferenceStats> stats = new ArrayList<>();
        for (Object[] row : results) {
            String dishName = (String) row[0];
            long orderCount = (Long) row[1];
            String customizationsStr = (String) row[2];
            List<String> customizations = Arrays.asList(customizationsStr.split(", "));  // Split the customizations

            // Calculate the percentage of total orders for the current dish
            double percentage = (double) orderCount / totalOrderCount * 100;

            // Create the DTO and add it to the list
            CustomerMenuPreferenceStats stat = new CustomerMenuPreferenceStats(dishName, orderCount, customizations, percentage);
        
            stats.add(stat);
        }

        return stats;
    }
}

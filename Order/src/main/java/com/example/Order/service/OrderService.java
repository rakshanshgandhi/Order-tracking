package com.example.Order.service;

import com.example.Order.model.Order;
import com.example.Order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        return optionalOrder.orElse(null);
    }

    public List<Order> getOrdersByTableNumber(int tableNumber) {
        return orderRepository.findByTableNumber(tableNumber);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long orderId, Order orderDetails) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setOrderName(orderDetails.getOrderName());
            order.setCustomerName(orderDetails.getCustomerName());
            order.setStatus(orderDetails.getStatus());
            order.setTableNumber(orderDetails.getTableNumber());
            order.setPrice(orderDetails.getPrice());
            order.setQuantity(orderDetails.getQuantity());
            return orderRepository.save(order);
        } else {
            return null;
        }
    }

    public boolean deleteOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            orderRepository.delete(optionalOrder.get());
            return true;
        } else {
            return false;
        }
    }

}


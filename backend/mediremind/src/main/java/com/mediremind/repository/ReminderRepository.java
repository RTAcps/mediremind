package com.mediremind.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediremind.model.Reminder;

public interface ReminderRepository extends MongoRepository<Reminder, String> {
    List<Reminder> findByUserId(String userId);
}

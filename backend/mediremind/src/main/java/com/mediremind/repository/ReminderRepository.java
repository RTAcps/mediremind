package com.mediremind.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediremind.model.Reminder;

public interface ReminderRepository extends MongoRepository<Reminder, String> {
	Page<Reminder> findAll(Pageable pageable);
}

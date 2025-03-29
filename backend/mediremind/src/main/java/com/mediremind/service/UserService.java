package com.mediremind.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mediremind.DTO.UserDTO;
import com.mediremind.model.User;
import com.mediremind.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()))
            .collect(Collectors.toList());
    }

    public Optional<UserDTO> getUserById(String id) {
        return userRepository.findById(id)
            .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()));
    }

    public UserDTO createUser(User user) {
        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }

    public Optional<UserDTO> updateUser(String id, User userDetails) {
        return userRepository.findById(id)
            .map(user -> {
                user.setName(userDetails.getName());
                user.setEmail(userDetails.getEmail());
                user.setRole(userDetails.getRole());
                userRepository.save(user);
                return new UserDTO(user.getId(), user.getName(), user.getEmail());
            });
    }

    public boolean deleteUser(String id) {
        return userRepository.findById(id)
            .map(user -> {
                userRepository.delete(user);
                return true;
            }).orElse(false);
    }
}

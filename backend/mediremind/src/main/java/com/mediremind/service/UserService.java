package com.mediremind.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Page<UserDTO> getAllUsers(String email, int page, int size) {
        if (email != null && !email.trim().isEmpty()) {
            List<User> usersByEmail = userRepository.findByEmail(email);
            List<UserDTO> userDTOs = usersByEmail.stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());

            return new PageImpl<>(userDTOs, PageRequest.of(page, size), userDTOs.size());
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findAll(pageable);

        List<UserDTO> userDTOs = userPage.getContent().stream()
            .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()))
            .collect(Collectors.toList());

        return new PageImpl<>(userDTOs, PageRequest.of(page, size), userDTOs.size());
    }


    public Optional<UserDTO> getUserById(String id) {
        return userRepository.findById(id)
            .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()));
    }

    public UserDTO createUser(User user) {
        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), user.getRole());
    }

    public Optional<UserDTO> updateUser(String id, User userDetails) {
        return userRepository.findById(id)
            .map(user -> {
                user.setName(userDetails.getName());
                user.setEmail(userDetails.getEmail());
                user.setRole(userDetails.getRole());
                userRepository.save(user);
                return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole());
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

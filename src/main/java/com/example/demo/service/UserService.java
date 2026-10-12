package com.example.demo.service;
import org.springframework.stereotype.Service;
import com.example.demo.User;
import com.example.demo.repository.UserRepository;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service

public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
	this.userRepository=userRepository;
	this.passwordEncoder = passwordEncoder;
	}
	
	public User saveUser(User user) {
	    if (user.getPassword() == null || user.getPassword().isBlank()) {
	        throw new IllegalArgumentException("Password is required.");
	    }

	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    return userRepository.save(user);
	}
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	
	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
		
	}
	public User updateUser(Long id,User user) {
		User existingUser=userRepository.findById(id).orElse(null);
		
		if(existingUser==null) {
			return null;
		}
		existingUser.setName(user.getName());
		existingUser.setEmail(user.getEmail());
		existingUser.setPassword(user.getPassword());
		existingUser.setRole(user.getRole());
		existingUser.setStatus(user.getStatus());
		
		return userRepository.save(existingUser);
	}
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

public User login(String email, String password) {

    User user = userRepository.findByEmail(email);

    if (user == null || password == null) {
        return null;
    }

    String storedPassword = user.getPassword();

    if (storedPassword == null) {
        return null;
    }

    // Check BCrypt-hashed passwords
    if (storedPassword.startsWith("$2a$")
            || storedPassword.startsWith("$2b$")
            || storedPassword.startsWith("$2y$")) {

        return passwordEncoder.matches(password, storedPassword)
                ? user
                : null;
    }

    if (storedPassword.equals(password)) {
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return user;
    }

    return null;
}

}

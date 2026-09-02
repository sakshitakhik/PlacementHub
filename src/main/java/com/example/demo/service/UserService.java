package com.example.demo.service;
import org.springframework.stereotype.Service;
import com.example.demo.User;
import com.example.demo.repository.UserRepository;
import java.util.List;
@Service

public class UserService {
	private final UserRepository userRepository;
	public UserService(UserRepository userRepository) {
	this.userRepository=userRepository;
	}
	
	public User saveUser(User user) {
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

	    if (user == null) {
	        return null;
	    }

	    if (!user.getPassword().equals(password)) {
	        return null;
	    }

	    return user;
	}
}
